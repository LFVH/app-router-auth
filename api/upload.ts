import type { NextApiRequest, NextApiResponse } from 'next';
import { createWriteStream } from '@vercel/blob';
import { Readable } from 'stream';

export const config = {
  api: {
    bodyParser: false,  // Desativa o bodyParser padrão para manipulação de uploads de arquivos
  },
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    try {
      const readable = new Readable();
      readable._read = () => {};  // Necessário para o stream funcionar corretamente

      req.pipe(readable);

      const { blob, error } = await createWriteStream({
        readable,  // Stream dos dados do arquivo
        filePath: 'uploads/${Date.now()}-${Math.round(Math.random() * 1e9)}.jpg',  // Defina o caminho e o nome do arquivo como quiser
        contentType: req.headers['content-type'] || 'application/octet-stream',  // Define o tipo de conteúdo do arquivo
      });

      if (error) {
        throw new Error(error);
      }

      // Salve a URL do arquivo no banco de dados, se necessário
      // Exemplo: await db.insert(...).values({ filepath: blob.url }).execute();
        // Salva no banco de dados
        await db.insert(images).values({
          filepath: blob.url
        }).execute();
      
      res.status(200).json({ message: 'Upload realizado com sucesso', url: blob.url });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end('Method Not Allowed');
  }
};