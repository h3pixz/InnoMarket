import { useState } from 'react';
import { IoIosSearch } from 'react-icons/io';
import { useGetProductsQuery } from '../app/api';
import { getMockAdminRow } from '../mocks/adminItems';
import AddItemModal from '../components/AddItemModal';
import '../styles/admin.css';

function formatCategory(slug) {
  return slug
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export default function AdminItemsPage() {
  const { data, isLoading, isError } = useGetProductsQuery();
  const [query, setQuery] = useState('');
  const [selectedIds, setSelectedIds] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const products = data?.products ?? [];
  const rows = products.map((product) => ({
    product,
    category: formatCategory(product.category),
    ...getMockAdminRow(product),
  }));

  const term = query.trim().toLowerCase();
  const filtered = term
    ? rows.filter((row) => row.product.title.toLowerCase().includes(term))
    : rows;

  const allSelected =
    filtered.length > 0 &&
    filtered.every((row) => selectedIds.includes(row.product.id));

  const toggleRow = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const toggleAll = () => {
    const ids = filtered.map((row) => row.product.id);
    setSelectedIds((prev) =>
      allSelected
        ? prev.filter((id) => !ids.includes(id))
        : [...new Set([...prev, ...ids])]
    );
  };

  return (
    <section className="admin-card">
      <div className="admin-card__header">
        <h1 className="admin-card__title">Maintain Items</h1>
        <div className="admin-card__tools">
          <div className="admin-search">
            <IoIosSearch className="admin-search__icon" />
            <input
              className="admin-search__input"
              type="search"
              aria-label="Search items"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
          </div>
          <button
            type="button"
            className="admin-add"
            onClick={() => setIsModalOpen(true)}
          >
            Add an Item
          </button>
        </div>
      </div>

      {isLoading && <p className="admin-note">Loading…</p>}
      {isError && <p className="admin-note">Failed to load items</p>}

      {data && (
        <table className="admin-table">
          <thead>
            <tr>
              <th className="admin-table__check">
                <input
                  type="checkbox"
                  aria-label="Select all"
                  checked={allSelected}
                  onChange={toggleAll}
                />
              </th>
              <th>Name</th>
              <th>Items</th>
              <th>Category</th>
              <th>Subcategory</th>
              <th>Storage</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((row) => (
              <tr key={row.product.id}>
                <td className="admin-table__check">
                  <input
                    type="checkbox"
                    aria-label={`Select ${row.product.title}`}
                    checked={selectedIds.includes(row.product.id)}
                    onChange={() => toggleRow(row.product.id)}
                  />
                </td>
                <td>
                  <div className="admin-table__name">
                    <img
                      className="admin-table__thumb"
                      src={row.product.thumbnail}
                      alt=""
                    />
                    <span className="admin-table__title">
                      {row.product.title}
                    </span>
                  </div>
                </td>
                <td>{row.items}</td>
                <td>{row.category}</td>
                <td>{row.subcategory}</td>
                <td className="admin-table__storage">{row.storage}</td>
                <td>
                  <span className={`admin-status admin-status--${row.statusKey}`}>
                    {row.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {data && !filtered.length && <p className="admin-note">No items found</p>}

      <AddItemModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={() => setIsModalOpen(false)}
      />
    </section>
  );
}
