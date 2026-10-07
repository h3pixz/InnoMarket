import { useState } from 'react';
import { IoIosArrowDown } from 'react-icons/io';
import '../styles/category-sidebar.css';

const CATEGORIES = [
  { label: 'Shoes' },
  { label: 'Apparel' },
  {
    label: 'Accessories',
    defaultOpen: true,
    children: [
      {
        label: 'Belts',
        defaultOpen: true,
        children: [{ label: 'Leather belts' }],
      },
    ],
  },
  { label: 'Sport' },
  { label: 'Beauty' },
];

function CategoryItem({ category, level }) {
  const [open, setOpen] = useState(Boolean(category.defaultOpen));
  const hasChildren = Boolean(category.children?.length);

  return (
    <li>
      <button
        type="button"
        className="sidebar__row"
        style={{ paddingLeft: level * 20 }}
        aria-expanded={hasChildren ? open : undefined}
        onClick={() => hasChildren && setOpen((prev) => !prev)}
      >
        <span>{category.label}</span>
        {hasChildren && (
          <IoIosArrowDown
            className={
              open
                ? 'sidebar__chevron sidebar__chevron--open'
                : 'sidebar__chevron'
            }
          />
        )}
      </button>

      {hasChildren && open && (
        <ul className="sidebar__list">
          {category.children.map((child) => (
            <CategoryItem key={child.label} category={child} level={level + 1} />
          ))}
        </ul>
      )}
    </li>
  );
}

export default function CategorySidebar() {
  return (
    <aside className="sidebar">
      <p className="sidebar__title">Categories</p>
      <ul className="sidebar__list">
        {CATEGORIES.map((category) => (
          <CategoryItem key={category.label} category={category} level={0} />
        ))}
      </ul>
    </aside>
  );
}
