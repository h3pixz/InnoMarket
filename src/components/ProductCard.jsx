import { FaHeart, FaShoppingCart } from 'react-icons/fa';
import { getMockDetails } from '../mocks/productDetails';
import { formatPrice } from '../utils/format';
import '../styles/product-card.css';

export default function ProductCard({ product }) {
  const { size, tags } = getMockDetails(product);
  const oldPrice = product.discountPercentage
    ? product.price / (1 - product.discountPercentage / 100)
    : null;
  const title = [product.title, product.brand, size].filter(Boolean).join(' - ');

  return (
    <article className="product-card">
      <div className="product-card__media">
        <img
          className="product-card__image"
          src={product.thumbnail}
          alt={product.title}
        />
        <button
          type="button"
          className="product-card__fav"
          aria-label="Add to favorites"
        >
          <FaHeart />
        </button>
        <div className="product-card__tags">
          {tags.map((tag) => (
            <span
              key={tag}
              className={`product-card__tag product-card__tag--${tag.toLowerCase()}`}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div className="product-card__body">
        <h3 className="product-card__title">{title}</h3>
        <div className="product-card__footer">
          <p className="product-card__price">
            {formatPrice(product.price)}
            {oldPrice && (
              <span className="product-card__price-old">
                {formatPrice(oldPrice)}
              </span>
            )}
          </p>
          <button
            type="button"
            className="product-card__cart"
            aria-label="Add to cart"
          >
            <FaShoppingCart />
          </button>
        </div>
      </div>
    </article>
  );
}
