'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';

type Image = {
  id: number;
  filename: string;
  filepath: string;
  createdAt: string;
};

export default function ImageList() {
  const [images, setImages] = useState<Image[]>([]);

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
      <ul>
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
      </ul>
    </div>
  );
}