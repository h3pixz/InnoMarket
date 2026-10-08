import { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectCartItems } from '../app/cartSlice';
import CategoryTabs from '../components/CategoryTabs';
import ReservedProduct from '../components/ReservedProduct';
import { SHOPS, getShopForProduct } from '../mocks/shops';
import '../styles/reserved.css';

const STATUSES = ['Reserved', 'Purchased'];

export default function ReservedPage() {
  const [status, setStatus] = useState(STATUSES[0]);
  const reservedItems = useSelector(selectCartItems);

  const shopsWithItems = SHOPS.map((shop) => ({
    ...shop,
    products: reservedItems.filter(
      (product) => getShopForProduct(product).id === shop.id
    ),
  })).filter((shop) => shop.products.length > 0);

  return (
    <>
      <CategoryTabs />
      <div className="reserved">
        <div className="reserved__statuses">
          {STATUSES.map((item) => (
            <button
              key={item}
              type="button"
              className={
                item === status
                  ? 'reserved__status reserved__status--active'
                  : 'reserved__status'
              }
              onClick={() => setStatus(item)}
            >
              {item}
            </button>
          ))}
        </div>

        {!shopsWithItems.length && (
          <p className="reserved__empty">No reserved items yet</p>
        )}

        {shopsWithItems.map((shop) => (
          <section key={shop.id} className="reserved-shop">
            <header className="reserved-shop__header">
              <div className="reserved-shop__field">
                <span className="reserved-shop__label">Shop</span>
                <span className="reserved-shop__value">{shop.name}</span>
              </div>
              <div className="reserved-shop__field">
                <span className="reserved-shop__label">Location</span>
                <span className="reserved-shop__value">{shop.location}</span>
              </div>
              <div className="reserved-shop__field">
                <span className="reserved-shop__label">Work hours</span>
                <span className="reserved-shop__value">{shop.workHours}</span>
              </div>
              <div className="reserved-shop__field">
                <span className="reserved-shop__label">Reserved time</span>
                <span className="reserved-shop__value">{shop.reservedTime}</span>
              </div>
            </header>

            <div className="reserved-shop__products">
              {shop.products.map((product) => (
                <ReservedProduct
                  key={product.id}
                  product={product}
                  freeShippingFrom={shop.freeShippingFrom}
                />
              ))}
            </div>
          </section>
        ))}
      </div>
    </>
  );
}
