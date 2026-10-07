import { useGetProductsQuery } from '../app/api';
import CategoryTabs from '../components/CategoryTabs';
import ProductCard from '../components/ProductCard';
import '../styles/catalog.css';

export default function HomePage() {
  const { data, isLoading, isError } = useGetProductsQuery();

  return (
    <>
      <CategoryTabs />
      <section className="catalog">
        {isLoading && <p>Loading…</p>}
        {isError && <p>Failed to load products</p>}
        {data && (
          <div className="catalog__grid">
            {data.products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>
    </>
  );
}
