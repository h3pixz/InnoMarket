import { useState } from 'react';
import '../styles/filters.css';

const INITIAL_CHIPS = [
  'Accessories',
  'White, Dark',
  '36, 36,5',
  'Wrangler, Columbia',
  'New',
];

export default function FilterChips() {
  const [chips, setChips] = useState(INITIAL_CHIPS);

  const removeChip = (chip) => {
    setChips((prev) => prev.filter((item) => item !== chip));
  };

  if (!chips.length) return null;

  return (
    <div className="filter-chips">
      {chips.map((chip) => (
        <button
          key={chip}
          type="button"
          className="filter-chips__chip"
          onClick={() => removeChip(chip)}
        >
          <span>{chip}</span>
          <span className="filter-chips__close">&times;</span>
        </button>
      ))}
    </div>
  );
}
