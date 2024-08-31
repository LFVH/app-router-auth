import type { NextApiRequest, NextApiResponse } from 'next';
import { put } from '@vercel/blob';
import { db } from '@/drizzle/db';

export const config = {
  api: {
    bodyParser: false,  // Desativa o bodyParser para uploads
  },
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    try {
      const buffers: any[] = [];

      req.on('data', (chunk) => {
        buffers.push(chunk);
      });

      req.on('end', async () => {
        const buffer = Buffer.concat(buffers);

        // Fazendo upload do arquivo usando a API do Vercel Blob
        const { url } = await put('uploads/my-uploaded-file', buffer, {
          access: 'public', // Define o nível de acesso (pode ser 'public' ou 'private')
          contentType: req.headers['content-type'] || 'application/octet-stream',
        });

        // Exemplo de salvamento da URL no banco de dados
                // Salva no banco de dados
        await db.insert(images).values({
          filepath: url
        }).execute();
		
        res.status(200).json({ message: 'Upload realizado com sucesso', url });
      });

    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end('Method Not Allowed');
  }
};