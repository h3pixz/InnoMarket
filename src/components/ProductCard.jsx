import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FaHeart, FaShoppingCart } from 'react-icons/fa';
import {
  addToCart,
  removeFromCart,
  selectIsFavorite,
  selectIsInCart,
  toggleFavorite,
} from '../app/cartSlice';
import { getMockDetails } from '../mocks/productDetails';
import { formatPrice } from '../utils/format';
import '../styles/product-card.css';

export default function ProductCard({ product }) {
  const dispatch = useDispatch();
  const { tags } = getMockDetails(product);
  const isInCart = useSelector(selectIsInCart(product.id));
  const isFavorite = useSelector(selectIsFavorite(product.id));
  const oldPrice = product.discountPercentage
    ? product.price / (1 - product.discountPercentage / 100)
    : null;
  const title = [product.title, product.brand].filter(Boolean).join(' - ');

  const handleCart = () => {
    if (isInCart) dispatch(removeFromCart(product.id));
    else dispatch(addToCart(product));
  };

  return (
    <article className="product-card">
      <Link className="product-card__link" to={`/product/${product.id}`}>
        <div className="product-card__media">
          <img
            className="product-card__image"
            src={product.thumbnail}
            alt={product.title}
          />
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
          <p className="product-card__price">
            {formatPrice(product.price)}
            {oldPrice && (
              <span className="product-card__price-old">
                {formatPrice(oldPrice)}
              </span>
            )}
          </p>
        </div>
      </Link>

      <button
        type="button"
        className={
          isFavorite
            ? 'product-card__fav product-card__fav--active'
            : 'product-card__fav'
        }
        aria-label="Add to favorites"
        onClick={() => dispatch(toggleFavorite(product.id))}
      >
        <FaHeart />
      </button>

      <button
        type="button"
        className={
          isInCart
            ? 'product-card__cart product-card__cart--added'
            : 'product-card__cart'
        }
        aria-label="Add to cart"
        onClick={handleCart}
      >
        {isInCart ? <span>Added</span> : <FaShoppingCart />}
      </button>
    </article>
  );
}
