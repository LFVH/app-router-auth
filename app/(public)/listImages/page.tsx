import { list } from '@vercel/blob';
 
export default async function Images() {
  async function allImages() {
    const blobs = await list();
    return blobs;
  }
  const images = await allImages();
 
  return (
  <section>
      {images.blobs.map((image) => (
        <li key={image.pathname}>
          <Image
            src={image.url}
            alt={image.pathname}
            width={200}
            height={200}
          />
        </li>
      ))}
    </section>
  );
}

import Image from 'next/image';