import { list } from '@vercel/blob';
import Image from 'next/image';

export default async function Images() {
  // Função para buscar as imagens usando a API do Vercel Blob
  const blobs = await list();
  
  return (
    <section>
      <ul>
        {blobs.blobs.map((image) => (
          <li key={image.pathname}>
            <Image
              src={image.url}
              alt={image.pathname}
              width={200}
              height={200}
              priority 
              unoptimized  
            />
          </li>
        ))}
      </ul>
    </section>
  );
}