import { IoIosArrowDown } from 'react-icons/io';
import FilterDropdown from './FilterDropdown';
import '../styles/filters.css';

const STATIC_FILTERS = ['Size', 'Condition', 'Shop'];

export default function FilterBar({
  colors,
  selectedColors,
  onToggleColor,
  price,
  onPriceChange,
  brands,
  selectedBrands,
  onToggleBrand,
  categories,
  selectedCategory,
  onSelectCategory,
  saleActive,
  onToggleSale,
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

      <FilterDropdown label="Brand">
        <ul className="filter-dropdown__options">
          {brands.map((brand) => (
            <li key={brand}>
              <label className="filter-dropdown__option">
                <input
                  type="checkbox"
                  checked={selectedBrands.includes(brand)}
                  onChange={() => onToggleBrand(brand)}
                />
                <span>{brand}</span>
              </label>
            </li>
          ))}
        </ul>
      </FilterDropdown>

      <FilterDropdown label="Category">
        <ul className="filter-dropdown__options">
          {categories.map((category) => (
            <li key={category}>
              <label className="filter-dropdown__option">
                <input
                  type="radio"
                  name="category"
                  checked={selectedCategory === category}
                  onChange={() => onSelectCategory(category)}
                />
                <span>{category}</span>
              </label>
            </li>
          ))}
        </ul>
      </FilterDropdown>

      {STATIC_FILTERS.map((filter) => (
        <button key={filter} type="button" className="filter-bar__select">
          <span>{filter}</span>
          <IoIosArrowDown className="filter-bar__chevron" />
        </button>
      ))}

      <button
        type="button"
        className={saleActive ? 'filter-bar__sale' : 'filter-bar__select'}
        aria-pressed={saleActive}
        onClick={onToggleSale}
      >
        <span>Sale</span>
        {saleActive && <span className="filter-bar__sale-close">&times;</span>}
      </button>
    </div>
  );
}
