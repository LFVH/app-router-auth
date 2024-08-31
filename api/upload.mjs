import { NextApiRequest, NextApiResponse } from 'next';
import * as formidable from 'formidable';
import { db } from './drizzle/db';
import { images } from './drizzle/schema';
import { promisify } from 'util';
import { pipeline } from 'stream';
import fs from 'fs-extra';
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

const parseForm = (req: NextApiRequest): Promise<{ fields: formidable.Fields; files: formidable.Files }> => {
  const form = new formidable.IncomingForm({ uploadDir: uploadDir, keepExtensions: true});
  fs.ensureDirSync(uploadDir);
  

  return new Promise((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) {
        reject(err);
      }
      resolve({ fields, files });
    });
  });
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { files } = await parseForm(req);

    // Primeiro, verifique se 'files.file' existe e não é undefined
    if (!files.file) {
      return res.status(400).json({ error: 'Nenhum arquivo foi enviado.' });
    }

    // Verifique se 'files.file' é um array
    const file = Array.isArray(files.file) ? files.file[0] : files.file;

	
	const oldPath = file.filepath;
    const newPath = path.join(uploadDir, file.newFilename);

    // Renomeia e move o arquivo para o diretório de uploads
    await promisify(fs.rename)(oldPath, newPath);

    // Salva no banco de dados
    await db.insert(images).values({
      filename: file.newFilename,
      filepath: '/uploads/${file.newFilename}',
    }).execute();
	
    // Faça algo com o arquivo
    res.status(200).json({ success: true, file: file });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao processar o upload do arquivo.' });
  }
}