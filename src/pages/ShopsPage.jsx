import { FaMapMarkerAlt, FaEnvelope, FaPhone } from 'react-icons/fa';
import { useGetUsersQuery } from '../app/api';
import Breadcrumbs from '../components/Breadcrumbs';
import '../styles/shops.css';

export default function ShopsPage() {
  const { data, isLoading, isError } = useGetUsersQuery();
  const shops = data?.users ?? [];
  const cities = new Set(shops.map((shop) => shop.company.address.city));

  return (
    <div className="shops">
      <Breadcrumbs items={['Home', 'All shops']} />

      <header className="shops__header">
        <h1 className="shops__title">All shops</h1>
        {data && (
          <p className="shops__subtitle">
            {shops.length} partner shops across {cities.size} cities
          </p>
        )}
      </header>

      {isLoading && <p className="shops__status">Loading…</p>}
      {isError && <p className="shops__status">Failed to load shops</p>}

      <div className="shops__grid">
        {shops.map((shop) => (
          <article key={shop.id} className="shop-card">
            <h2 className="shop-card__name">{shop.company.name}</h2>

            <p className="shop-card__location">
              <FaMapMarkerAlt className="shop-card__icon" />
              <span>
                {shop.company.address.address}, {shop.company.address.city},{' '}
                {shop.company.address.country}
              </span>
            </p>

            <div className="shop-card__contacts">
              <a className="shop-card__link" href={`mailto:${shop.email}`}>
                <FaEnvelope className="shop-card__icon" />
                <span>{shop.email}</span>
              </a>
              <a
                className="shop-card__link"
                href={`tel:${shop.phone.replace(/[^+\d]/g, '')}`}
              >
                <FaPhone className="shop-card__icon" />
                <span>{shop.phone}</span>
              </a>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
