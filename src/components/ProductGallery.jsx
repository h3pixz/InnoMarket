import { useState } from 'react';
import '../styles/product-detail.css';

export default function ProductGallery({ images, alt }) {
  const [active, setActive] = useState(images[0]);

  return (
    <div className="product-gallery">
      <div className="product-gallery__main">
        <img className="product-gallery__image" src={active} alt={alt} />
      </div>
      <div className="product-gallery__thumbs">
        {images.map((image) => (
          <button
            key={image}
            type="button"
            className={
              image === active
                ? 'product-gallery__thumb product-gallery__thumb--active'
                : 'product-gallery__thumb'
            }
            onClick={() => setActive(image)}
          >
            <img src={image} alt={alt} />
          </button>
        ))}
      </div>
    </div>
  );
}
