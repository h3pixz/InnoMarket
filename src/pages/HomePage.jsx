import { useGetProductsQuery } from '../app/api';

export default function HomePage() {
  const { data, isLoading, isError } = useGetProductsQuery();

  if (isLoading) return <p>Loading…</p>;
  if (isError) return <p>Failed to load products</p>;

  return <pre>{JSON.stringify(data.products.slice(0, 3), null, 2)}</pre>;
}
