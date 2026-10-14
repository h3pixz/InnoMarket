import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IoIosSearch } from 'react-icons/io';
import { FaTrashAlt } from 'react-icons/fa';
import { useGetProductsQuery } from '../app/api';
import {
  addAdminItem,
  removeAdminItem,
  removeAdminItems,
  selectAddedItems,
} from '../app/adminItemsSlice';
import { getMockAdminRow } from '../mocks/adminItems';
import AddItemModal from '../components/AddItemModal';
import '../styles/admin.css';

const FALLBACK_IMAGE =
  'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="300" height="300"><rect width="300" height="300" fill="%23ececec"/></svg>';

function formatCategory(slug) {
  return slug
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export default function AdminItemsPage() {
  const dispatch = useDispatch();
  const { data, isLoading, isError } = useGetProductsQuery();
  const addedItems = useSelector(selectAddedItems);
  const [query, setQuery] = useState('');
  const [selectedIds, setSelectedIds] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const products = [...addedItems, ...(data?.products ?? [])];
  const addedIds = new Set(addedItems.map((item) => item.id));
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

  const handleAddItem = (form) => {
    const image = form.thumbnail.trim() || FALLBACK_IMAGE;
    const brand = form.brand.trim();
    dispatch(
      addAdminItem({
        id: Date.now(),
        title: form.title.trim(),
        price: Number(form.price),
        category: form.category.trim(),
        thumbnail: image,
        images: [image],
        description: form.description.trim(),
        discountPercentage: 0,
        ...(brand ? { brand } : {}),
      })
    );
    setIsModalOpen(false);
  };

  const selectedAddedIds = selectedIds.filter((id) => addedIds.has(id));

  const handleDeleteSelected = () => {
    dispatch(removeAdminItems(selectedAddedIds));
    setSelectedIds((prev) => prev.filter((id) => !addedIds.has(id)));
  };

  const handleDeleteRow = (id) => {
    dispatch(removeAdminItem(id));
    setSelectedIds((prev) => prev.filter((item) => item !== id));
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
          <button
            type="button"
            className="admin-delete"
            onClick={handleDeleteSelected}
            disabled={!selectedAddedIds.length}
          >
            Delete
          </button>
        </div>
      </div>

      {isLoading && <p className="admin-note">Loading…</p>}
      {isError && <p className="admin-note">Failed to load items</p>}

      {products.length > 0 && (
        <div className="admin-table__scroll">
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
                <th className="admin-table__actions" aria-label="Actions" />
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
                    <span
                      className={`admin-status admin-status--${row.statusKey}`}
                    >
                      {row.status}
                    </span>
                  </td>
                  <td className="admin-table__actions">
                    <button
                      type="button"
                      className="admin-table__delete"
                      aria-label={`Delete ${row.product.title}`}
                      onClick={() => handleDeleteRow(row.product.id)}
                      disabled={!addedIds.has(row.product.id)}
                    >
                      <FaTrashAlt />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {products.length > 0 && !filtered.length && (
        <p className="admin-note">No items found</p>
      )}

      <AddItemModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddItem}
      />
    </section>
  );
}
