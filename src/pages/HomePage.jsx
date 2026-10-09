import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useGetProductsQuery } from '../app/api';
import Breadcrumbs from '../components/Breadcrumbs';
import CategorySidebar from '../components/CategorySidebar';
import CategoryTabs from '../components/CategoryTabs';
import FilterBar from '../components/FilterBar';
import FilterChips from '../components/FilterChips';
import ProductCard from '../components/ProductCard';
import SortBar from '../components/SortBar';
import { getMockDetails } from '../mocks/productDetails';
import '../styles/catalog.css';

export default function HomePage() {
  const { data, isLoading, isError } = useGetProductsQuery();
  const [searchParams] = useSearchParams();
  const [selectedColors, setSelectedColors] = useState([]);
  const [price, setPrice] = useState({ min: '', max: '' });
  const query = (searchParams.get('q') ?? '').trim().toLowerCase();

  const products = data?.products ?? [];
  const colors = [...new Set(products.map((item) => getMockDetails(item).color))].sort();

  const toggleColor = (color) => {
    setSelectedColors((prev) =>
      prev.includes(color) ? prev.filter((item) => item !== color) : [...prev, color]
    );
  };

  const minPrice = price.min === '' ? -Infinity : Number(price.min);
  const maxPrice = price.max === '' ? Infinity : Number(price.max);

  const filtered = products.filter((product) => {
    const colorMatches =
      !selectedColors.length || selectedColors.includes(getMockDetails(product).color);
    const priceMatches = product.price >= minPrice && product.price <= maxPrice;
    const titleMatches =
      !query ||
      product.title.toLowerCase().includes(query) ||
      (product.brand ?? '').toLowerCase().includes(query);
    return colorMatches && priceMatches && titleMatches;
  });

  return (
    <>
      <CategoryTabs />
      <div className="catalog-layout">
        <CategorySidebar />
        <div className="catalog-main">
          <Breadcrumbs />
          <FilterBar
            colors={colors}
            selectedColors={selectedColors}
            onToggleColor={toggleColor}
            price={price}
            onPriceChange={setPrice}
          />
          <FilterChips
            selectedColors={selectedColors}
            onRemoveColor={toggleColor}
            price={price}
            onClearPrice={() => setPrice({ min: '', max: '' })}
          />
          <SortBar />
          {isLoading && <p>Loading…</p>}
          {isError && <p>Failed to load products</p>}
          {data && !filtered.length && (
            <p className="catalog__empty">No items found</p>
          )}
          {data && filtered.length > 0 && (
            <div className="catalog__grid">
              {filtered.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
