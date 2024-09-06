import { list } from '@vercel/blob';

export default async function Images() {
  // Função para buscar as imagens usando a API do Vercel Blob
  console.log("dsadasdsadsasdaads");
  const images = await list();
  console.log('teste',images);
  return (
    <section>
      <ul>
        {images.blobs.map((image) => (
          <li key={image.pathname}>
            <img
              src={image.url}
              alt={image.pathname}
              width={200}
              height={200}
            />
          </li>
        ))}
      </ul>
    </section>
  );
}