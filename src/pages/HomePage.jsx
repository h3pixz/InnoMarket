import { useGetProductsQuery } from '../app/api';
import Breadcrumbs from '../components/Breadcrumbs';
import CategorySidebar from '../components/CategorySidebar';
import CategoryTabs from '../components/CategoryTabs';
import FilterBar from '../components/FilterBar';
import FilterChips from '../components/FilterChips';
import ProductCard from '../components/ProductCard';
import SortBar from '../components/SortBar';
import '../styles/catalog.css';

export default function HomePage() {
  const { data, isLoading, isError } = useGetProductsQuery();

  return (
    <>
      <CategoryTabs />
      <div className="catalog-layout">
        <CategorySidebar />
        <div className="catalog-main">
          <Breadcrumbs />
          <FilterBar />
          <FilterChips />
          <SortBar />
          {isLoading && <p>Loading…</p>}
          {isError && <p>Failed to load products</p>}
          {data && (
            <div className="catalog__grid">
              {data.products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
