import { useSelector } from 'react-redux';
import { useGetProductsQuery } from '../app/api';
import { selectAddedItems } from '../app/adminItemsSlice';
import ProductCard from '../components/ProductCard';
import '../styles/catalog.css';

export default function LikesPage() {
  const { data, isLoading, isError } = useGetProductsQuery();
  const addedItems = useSelector(selectAddedItems);
  const favoriteIds = useSelector((state) => state.cart.favoriteIds);

  const products = [...addedItems, ...(data?.products ?? [])];
  const likedProducts = products.filter((product) =>
    favoriteIds.includes(product.id)
  );

  return (
    <section className="catalog">
      {isLoading && <p>Loading…</p>}
      {isError && <p>Failed to load products</p>}
      {products.length > 0 && !likedProducts.length && (
        <p className="catalog__empty">No liked items yet</p>
      )}
      {likedProducts.length > 0 && (
        <div className="catalog__grid">
          {likedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </section>
  );
}
