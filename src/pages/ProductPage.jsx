import { useParams } from 'react-router-dom';
import { IoIosArrowDown } from 'react-icons/io';
import { FaHeart, FaShoppingCart } from 'react-icons/fa';
import { useGetProductByIdQuery } from '../app/api';
import Breadcrumbs from '../components/Breadcrumbs';
import ProductGallery from '../components/ProductGallery';
import { getMockDetails } from '../mocks/productDetails';
import { formatPrice } from '../utils/format';
import '../styles/product-detail.css';

export default function ProductPage() {
  const { id } = useParams();
  const { data, isLoading, isError } = useGetProductByIdQuery(id);

  if (isLoading) return <p>Loading…</p>;
  if (isError) return <p>Failed to load product</p>;

  const { size, color, deliveryTime, tags } = getMockDetails(data);
  const oldPrice = data.discountPercentage
    ? data.price / (1 - data.discountPercentage / 100)
    : null;
  const title = [data.title, data.brand, size].filter(Boolean).join(' - ');
  const freeShippingFrom = 34 + (data.id % 3) * 8;

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
            <button type="button" className="product-detail__cart">
              <FaShoppingCart />
              <span>Add to cart</span>
            </button>
            <button
              type="button"
              className="product-detail__fav"
              aria-label="Add to favorites"
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
