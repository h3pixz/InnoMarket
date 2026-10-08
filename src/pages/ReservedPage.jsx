import { useState } from 'react';
import { useGetProductsQuery } from '../app/api';
import CategoryTabs from '../components/CategoryTabs';
import ReservedProduct from '../components/ReservedProduct';
import { SHOPS } from '../mocks/shops';
import '../styles/reserved.css';

const STATUSES = ['Reserved', 'Purchased'];

export default function ReservedPage() {
  const [status, setStatus] = useState(STATUSES[0]);
  const { data, isLoading, isError } = useGetProductsQuery();

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

        {isLoading && <p>Loading…</p>}
        {isError && <p>Failed to load products</p>}
        {data &&
          SHOPS.map((shop) => (
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
                {shop.productIndexes.map((index) =>
                  data.products[index] ? (
                    <ReservedProduct
                      key={data.products[index].id}
                      product={data.products[index]}
                      freeShippingFrom={shop.freeShippingFrom}
                    />
                  ) : null
                )}
              </div>
            </section>
          ))}
      </div>
    </>
  );
}
