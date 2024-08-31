import type { NextApiRequest, NextApiResponse } from 'next';
import multer from 'multer';
import { db } from '@/drizzle/db';
import { images } from '@/drizzle/schema';
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

// Configuração do Multer para armazenar arquivos no diretório especificado
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage: storage });

export default async (req: NextApiRequest, res: NextApiResponse) => {
  upload.single('file')(req, res, async (err: any) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    try {
      // Aqui você pode acessar o arquivo carregado via req.file e os campos via req.body
      const file = req.file;
      const fields = req.body;

      if (file) {
        // Salva no banco de dados
        await db.insert(images).values({
          filename: file.filename,  // `filename` é a propriedade usada pelo Multer para o nome do arquivo final
          filepath: '/uploads/${file.filename}',
        }).execute();
      }

      res.status(200).json({ message: 'Upload realizado com sucesso' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
};