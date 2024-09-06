import Image from 'next/image';

export default function Images({ images }) {
  return (
    <section>
      {images.map((image) => (
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