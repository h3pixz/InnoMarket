import { useState } from 'react';
import '../styles/filters.css';

const OPTIONS = ['Ascending price', 'Descending price'];

export default function SortBar() {
  const [active, setActive] = useState(OPTIONS[0]);

  return (
    <div className="sort-bar">
      <span className="sort-bar__label">Sort by:</span>
      {OPTIONS.map((option) => (
        <button
          key={option}
          type="button"
          className={
            option === active
              ? 'sort-bar__option sort-bar__option--active'
              : 'sort-bar__option'
          }
          onClick={() => setActive(option)}
        >
          {option}
        </button>
      ))}
    </div>
  );
}
