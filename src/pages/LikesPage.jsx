import { useSelector } from 'react-redux';
import { useGetProductsQuery } from '../app/api';
import ProductCard from '../components/ProductCard';
import '../styles/catalog.css';

export default function LikesPage() {
  const { data, isLoading, isError } = useGetProductsQuery();
  const favoriteIds = useSelector((state) => state.cart.favoriteIds);

  const likedProducts = (data?.products ?? []).filter((product) =>
    favoriteIds.includes(product.id)
  );

  return (
    <section className="catalog">
      {isLoading && <p>Loading…</p>}
      {isError && <p>Failed to load products</p>}
      {data && !likedProducts.length && (
        <p className="catalog__empty">No liked items yet</p>
      )}
      {data && likedProducts.length > 0 && (
        <div className="catalog__grid">
          {likedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </section>
  );
}
