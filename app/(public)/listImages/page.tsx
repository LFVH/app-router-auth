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
        <ul>
        {images.map((image) => (
          <li key={image.id}>
            <img src={image.filepath} alt={image.filename} width={200} />
            <p>{image.filename}</p>
          </li>
        ))}
      </ul>
        </section>
    </div>
  );
}