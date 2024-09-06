import { list } from '@vercel/blob';
import Image from 'next/image';

export async function getServerSideProps() {
  const blobs = await list();
  return {
    props: {
      images: blobs.blobs,
    },
  };
}

export default function Images({ images }) {
  return (
    <section>
      <ul>
        {images.map((image) => (
          <li key={image.pathname}>
            <Image
              src={image.url}
              alt={image.pathname}
              width={200}
              height={200}
              // Adiciona a prioridade para carregar de forma otimizada
              priority
            />
          </li>
        ))}
      </ul>
    </section>
  );
}