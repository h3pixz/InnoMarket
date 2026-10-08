import { IoIosArrowDown } from 'react-icons/io';
import FilterDropdown from './FilterDropdown';
import '../styles/filters.css';

const STATIC_FILTERS = ['Size', 'Brand', 'Condition', 'Shop'];

export default function FilterBar({
  colors,
  selectedColors,
  onToggleColor,
  price,
  onPriceChange,
}) {
  return (
    <div className="filter-bar">
      <FilterDropdown label="Color">
        <ul className="filter-dropdown__options">
          {colors.map((color) => (
            <li key={color}>
              <label className="filter-dropdown__option">
                <input
                  type="checkbox"
                  checked={selectedColors.includes(color)}
                  onChange={() => onToggleColor(color)}
                />
                <span>{color}</span>
              </label>
            </li>
          ))}
        </ul>
      </FilterDropdown>

      <FilterDropdown label="Price">
        <div className="filter-dropdown__price">
          <input
            className="filter-dropdown__price-input"
            type="number"
            min="0"
            placeholder="From"
            aria-label="Minimum price"
            value={price.min}
            onChange={(event) => onPriceChange({ ...price, min: event.target.value })}
          />
          <span className="filter-dropdown__price-dash">—</span>
          <input
            className="filter-dropdown__price-input"
            type="number"
            min="0"
            placeholder="To"
            aria-label="Maximum price"
            value={price.max}
            onChange={(event) => onPriceChange({ ...price, max: event.target.value })}
          />
        </div>
      </FilterDropdown>

      {STATIC_FILTERS.map((filter) => (
        <button key={filter} type="button" className="filter-bar__select">
          <span>{filter}</span>
          <IoIosArrowDown className="filter-bar__chevron" />
        </button>
      ))}

      <button type="button" className="filter-bar__sale">
        <span>Sale</span>
        <span className="filter-bar__sale-close">&times;</span>
      </button>
    </div>
  );
}
