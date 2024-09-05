'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';

type Imge = {
  id: number;
  filename: string;
  filepath: string;
  createdAt: string;
};

export default function ImageListPage() {
  const [images, setImages] = useState<Imge[]>([]);

  useEffect(() => {
    const fetchImages = async () => {
      const response = await fetch('/api/images');
      const data = await response.json();
      setImages(data);
    };

    fetchImages();
  }, []);

  return (
    <div>
      <h2>Imagens Carregadas</h2>
<section>
        {images.map((image) => (
          <Image
          priority
          key={image.filename}
          src={image.filepath}
          alt={image.filename}
          width={200}
          height={200}
        />
        ))}
        </section>
    </div>
  );
}