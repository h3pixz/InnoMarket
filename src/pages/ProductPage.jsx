import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { IoIosArrowDown } from 'react-icons/io';
import { FaHeart, FaShoppingCart } from 'react-icons/fa';
import { useGetProductByIdQuery } from '../app/api';
import {
  addToCart,
  removeFromCart,
  selectIsFavorite,
  selectIsInCart,
  toggleFavorite,
} from '../app/cartSlice';
import Breadcrumbs from '../components/Breadcrumbs';
import ProductGallery from '../components/ProductGallery';
import { getMockDetails } from '../mocks/productDetails';
import { formatPrice } from '../utils/format';
import '../styles/product-detail.css';

export default function ProductPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { data, isLoading, isError } = useGetProductByIdQuery(id);
  const isInCart = useSelector(selectIsInCart(Number(id)));
  const isFavorite = useSelector(selectIsFavorite(Number(id)));

  if (isLoading) return <p>Loading…</p>;
  if (isError) return <p>Failed to load product</p>;

  const { color, deliveryTime, tags } = getMockDetails(data);
  const oldPrice = data.discountPercentage
    ? data.price / (1 - data.discountPercentage / 100)
    : null;
  const title = [data.title, data.brand].filter(Boolean).join(' - ');
  const freeShippingFrom = 34 + (data.id % 3) * 8;

  const handleCart = () => {
    if (isInCart) dispatch(removeFromCart(data.id));
    else dispatch(addToCart(data));
  };

  return (
    <section className="product-detail">
      <Breadcrumbs items={['Home', data.category, data.title]} />

      <div className="product-detail__layout">
        <ProductGallery images={data.images} alt={data.title} />

        <div className="product-detail__info">
          <h1 className="product-detail__title">{title}</h1>

          <div className="product-detail__tags">
            {tags.map((tag) => (
              <span
                key={tag}
                className={`product-detail__tag product-detail__tag--${tag.toLowerCase()}`}
              >
                {tag}
              </span>
            ))}
          </div>

          <p className="product-detail__price">
            {formatPrice(data.price)}
            {oldPrice && (
              <span className="product-detail__price-old">
                {formatPrice(oldPrice)}
              </span>
            )}
          </p>

          <dl className="product-detail__specs">
            <div className="product-detail__spec">
              <dt className="product-detail__label">Color:</dt>
              <dd className="product-detail__value">{color}</dd>
            </div>
          </dl>

          <p className="product-detail__row">
            <span className="product-detail__label">Delivery time:</span>
            <span className="product-detail__value">{deliveryTime}</span>
          </p>

          <button type="button" className="product-detail__shipping">
            <span>Shipping to Germany</span>
            <IoIosArrowDown />
          </button>

          <p className="product-detail__free">
            Free shipping from {formatPrice(freeShippingFrom)}
          </p>

          <div className="product-detail__actions">
            <button
              type="button"
              className="product-detail__cart"
              onClick={handleCart}
            >
              <FaShoppingCart />
              <span>{isInCart ? 'Added' : 'Add to cart'}</span>
            </button>
            <button
              type="button"
              className={
                isFavorite
                  ? 'product-detail__fav product-detail__fav--active'
                  : 'product-detail__fav'
              }
              aria-label="Add to favorites"
              onClick={() => dispatch(toggleFavorite(data.id))}
            >
              <FaHeart />
            </button>
          </div>

          <p className="product-detail__description">{data.description}</p>
        </div>
      </div>
    </section>
  );
}
