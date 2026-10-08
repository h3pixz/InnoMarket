import { useParams } from 'react-router-dom';
import { useGetProductByIdQuery } from '../app/api';

export default function ProductPage() {
  const { id } = useParams();
  const { data, isLoading, isError } = useGetProductByIdQuery(id);

  if (isLoading) return <p>Loading…</p>;
  if (isError) return <p>Failed to load product</p>;

  return <pre>{JSON.stringify(data, null, 2)}</pre>;
}
