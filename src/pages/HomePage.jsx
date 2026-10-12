import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useGetProductsQuery } from '../app/api';
import Breadcrumbs from '../components/Breadcrumbs';
import CategorySidebar from '../components/CategorySidebar';
import CategoryTabs from '../components/CategoryTabs';
import FilterBar from '../components/FilterBar';
import FilterChips from '../components/FilterChips';
import ProductCard from '../components/ProductCard';
import SortBar, { SORT_ASC } from '../components/SortBar';
import { getMockDetails } from '../mocks/productDetails';
import '../styles/catalog.css';

const SALE_MIN_DISCOUNT = 10;
const NO_BRAND = 'No brand';

export default function HomePage() {
  const { data, isLoading, isError } = useGetProductsQuery();
  const [searchParams] = useSearchParams();
  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [saleActive, setSaleActive] = useState(false);
  const [sort, setSort] = useState(null);
  const [price, setPrice] = useState({ min: '', max: '' });
  const query = (searchParams.get('q') ?? '').trim().toLowerCase();

  const products = data?.products ?? [];
  const colors = [...new Set(products.map((item) => getMockDetails(item).color))].sort();
  const brands = [...new Set(products.map((item) => item.brand ?? NO_BRAND))].sort();
  const categories = [...new Set(products.map((item) => item.category))].sort();

  const toggleColor = (color) => {
    setSelectedColors((prev) =>
      prev.includes(color) ? prev.filter((item) => item !== color) : [...prev, color]
    );
  };

  const toggleBrand = (brand) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((item) => item !== brand) : [...prev, brand]
    );
  };

  const toggleSale = () => setSaleActive((prev) => !prev);

  const toggleSort = (option) => setSort((prev) => (prev === option ? null : option));

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
    const brandMatches =
      !selectedBrands.length ||
      selectedBrands.includes(product.brand ?? NO_BRAND);
    const categoryMatches =
      !selectedCategory || product.category === selectedCategory;
    const saleMatches = !saleActive || product.discountPercentage >= SALE_MIN_DISCOUNT;
    return (
      colorMatches &&
      priceMatches &&
      titleMatches &&
      brandMatches &&
      categoryMatches &&
      saleMatches
    );
  });

  const sorted = sort
    ? [...filtered].sort((a, b) =>
        sort === SORT_ASC ? a.price - b.price : b.price - a.price
      )
    : filtered;

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
            brands={brands}
            selectedBrands={selectedBrands}
            onToggleBrand={toggleBrand}
            categories={categories}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
            saleActive={saleActive}
            onToggleSale={toggleSale}
          />
          <FilterChips
            selectedColors={selectedColors}
            onRemoveColor={toggleColor}
            selectedBrands={selectedBrands}
            onRemoveBrand={toggleBrand}
            selectedCategory={selectedCategory}
            onClearCategory={() => setSelectedCategory('')}
            saleActive={saleActive}
            onClearSale={toggleSale}
            price={price}
            onClearPrice={() => setPrice({ min: '', max: '' })}
          />
          <SortBar value={sort} onChange={toggleSort} />
          {isLoading && <p>Loading…</p>}
          {isError && <p>Failed to load products</p>}
          {data && !filtered.length && (
            <p className="catalog__empty">No items found</p>
          )}
          {data && sorted.length > 0 && (
            <div className="catalog__grid">
              {sorted.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
