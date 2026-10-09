import { useDispatch } from 'react-redux';
import { IoIosArrowDown } from 'react-icons/io';
import { FaTimes } from 'react-icons/fa';
import { removeFromCart } from '../app/cartSlice';
import { getMockDetails } from '../mocks/productDetails';
import { formatPrice } from '../utils/format';
import '../styles/reserved.css';

export default function ReservedProduct({ product, freeShippingFrom }) {
  const dispatch = useDispatch();
  const { size, color, deliveryTime } = getMockDetails(product);
  const title = [product.title, product.brand, size].filter(Boolean).join(' - ');

  return (
    <article className="reserved-product">
      <button
        type="button"
        className="reserved-product__remove"
        aria-label="Remove from reserved"
        onClick={() => dispatch(removeFromCart(product.id))}
      >
        <FaTimes />
      </button>

      <img
        className="reserved-product__image"
        src={product.thumbnail}
        alt={product.title}
      />

      <div className="reserved-product__info">
        <h3 className="reserved-product__title">{title}</h3>

        <p className="reserved-product__row">
          <span className="reserved-product__label">Price:</span>
          <span className="reserved-product__value">
            {formatPrice(product.price)}
          </span>
        </p>

        <p className="reserved-product__row">
          <span className="reserved-product__label">Color:</span>
          <span className="reserved-product__value">{color}</span>
          <span className="reserved-product__label reserved-product__label--gap">
            Size:
          </span>
          <span className="reserved-product__value">{size}</span>
        </p>

        <p className="reserved-product__row">
          <span className="reserved-product__label">Delivery time:</span>
          <span className="reserved-product__value">{deliveryTime}</span>
        </p>

        <button type="button" className="reserved-product__shipping">
          <span>Shipping to Germany</span>
          <IoIosArrowDown />
        </button>

        <p className="reserved-product__free">
          Free shipping from {formatPrice(freeShippingFrom)}
        </p>
      </div>
    </article>
  );
}
