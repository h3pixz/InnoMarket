import '../styles/filters.css';

export const SORT_ASC = 'Ascending price';
export const SORT_DESC = 'Descending price';

const OPTIONS = [SORT_ASC, SORT_DESC];

export default function SortBar({ value, onChange }) {
  return (
    <div className="sort-bar">
      <span className="sort-bar__label">Sort by:</span>
      {OPTIONS.map((option) => (
        <button
          key={option}
          type="button"
          className={
            option === value
              ? 'sort-bar__option sort-bar__option--active'
              : 'sort-bar__option'
          }
          onClick={() => onChange(option)}
        >
          {option}
        </button>
      ))}
    </div>
  );
}
