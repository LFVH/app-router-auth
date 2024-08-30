import type { NextApiRequest, NextApiResponse } from 'next';
import formidable from 'formidable';
import { db } from '@/drizzle/db';
import { images } from '@/drizzle/schema';
import { promisify } from 'util';
import { pipeline } from 'stream';
import fs from 'fs';
import path from 'path';

const uploadDir = path.join(process.cwd(), 'public', 'uploads');

// Assegura que o diretório de upload existe
fs.mkdirSync(uploadDir, { recursive: true });

// Desabilita o parsing de body por padrão para essa rota
export const config = {
  api: {
    bodyParser: false,
  },
};

const parseForm = (req: NextApiRequest): Promise<formidable.Fields & formidable.Files> => {
  const form = formidable({ uploadDir, keepExtensions: true });

  return new Promise((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) reject(err);
      resolve({ fields, files });
    });
  });
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { files } = await parseForm(req);
    const file = files.file as formidable.File;

    const oldPath = file.filepath;
    const newPath = path.join(uploadDir, file.newFilename);

    // Renomeia e move o arquivo para o diretório de uploads
    await promisify(fs.rename)(oldPath, newPath);

    // Salva no banco de dados
    await db.insert(images).values({
      filename: file.newFilename,
      filepath: `/uploads/${file.newFilename}`,
    }).execute();

    res.status(200).json({ message: 'Upload successful', filename: file.newFilename });
  } catch (error) {
    res.status(500).json({ message: 'Upload failed', error });
  }
}