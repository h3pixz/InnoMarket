import { useEffect, useState } from 'react';
import '../styles/add-item-modal.css';

const EMPTY_FORM = {
  title: '',
  price: '',
  category: '',
  brand: '',
  thumbnail: '',
  description: '',
};

export default function AddItemModal({ open, onClose, onSubmit }) {
  const [form, setForm] = useState(EMPTY_FORM);

  useEffect(() => {
    if (open) setForm(EMPTY_FORM);
  }, [open]);

  useEffect(() => {
    if (!open) return undefined;
    const handleKey = (event) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [open, onClose]);

  if (!open) return null;

  const update = (name) => (event) =>
    setForm((prev) => ({ ...prev, [name]: event.target.value }));

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(form);
  };

  return (
    <div className="add-modal" onMouseDown={onClose}>
      <div
        className="add-modal__dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="add-modal-title"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <h2 className="add-modal__title" id="add-modal-title">
          Add an Item
        </h2>

        <form className="add-modal__form" onSubmit={handleSubmit}>
          <label className="add-modal__field">
            <span className="add-modal__label">Name</span>
            <input
              className="add-modal__input"
              type="text"
              value={form.title}
              onChange={update('title')}
              autoFocus
              required
            />
          </label>

          <label className="add-modal__field">
            <span className="add-modal__label">Price</span>
            <input
              className="add-modal__input"
              type="number"
              min="0"
              step="0.01"
              value={form.price}
              onChange={update('price')}
              required
            />
          </label>

          <label className="add-modal__field">
            <span className="add-modal__label">Category</span>
            <input
              className="add-modal__input"
              type="text"
              value={form.category}
              onChange={update('category')}
              required
            />
          </label>

          <label className="add-modal__field">
            <span className="add-modal__label">Brand</span>
            <input
              className="add-modal__input"
              type="text"
              value={form.brand}
              onChange={update('brand')}
            />
          </label>

          <label className="add-modal__field">
            <span className="add-modal__label">Image URL</span>
            <input
              className="add-modal__input"
              type="url"
              value={form.thumbnail}
              onChange={update('thumbnail')}
            />
          </label>

          <label className="add-modal__field">
            <span className="add-modal__label">Description</span>
            <textarea
              className="add-modal__input"
              rows="3"
              value={form.description}
              onChange={update('description')}
            />
          </label>

          <div className="add-modal__actions">
            <button
              type="button"
              className="add-modal__cancel"
              onClick={onClose}
            >
              Cancel
            </button>
            <button type="submit" className="add-modal__save">
              Add Item
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
