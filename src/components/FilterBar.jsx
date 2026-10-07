import { IoIosArrowDown } from 'react-icons/io';
import '../styles/filters.css';

const FILTERS = ['Color', 'Size', 'Brand', 'Price', 'Condition', 'Shop'];

export default function FilterBar() {
  return (
    <div className="filter-bar">
      {FILTERS.map((filter) => (
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
