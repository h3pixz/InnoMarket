import { useGetProductsQuery } from '../app/api';
import ProductCard from '../components/ProductCard';
import '../styles/catalog.css';

export default function HomePage() {
  const { data, isLoading, isError } = useGetProductsQuery();

  if (isLoading) return <p>Loading…</p>;
  if (isError) return <p>Failed to load products</p>;

  return (
    <section className="catalog">
      <div className="catalog__grid">
        {data.products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
