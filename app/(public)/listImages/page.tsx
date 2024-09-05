import { list } from '@vercel/blob';
import Image from 'next/image';
 
export default async function Images() {
  async function allImages() {
    const blobs = await list();
    return blobs;
  }
  const images = await allImages();
 
  return (
 <section>
        {images.map((image) => (
          <li key={image.pathname}>
            <img src={image.url} alt={image.pathname} width={200} />
          </li>
        ))}

        </section>

  );
}