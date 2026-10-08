import { useEffect, useRef, useState } from 'react';
import { IoIosArrowDown } from 'react-icons/io';
import '../styles/filters.css';

export default function FilterDropdown({ label, children }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (!open) return undefined;

    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) setOpen(false);
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [open]);

  return (
    <div className="filter-dropdown" ref={ref}>
      <button
        type="button"
        className="filter-bar__select"
        aria-expanded={open}
        onClick={() => setOpen((prev) => !prev)}
      >
        <span>{label}</span>
        <IoIosArrowDown className="filter-bar__chevron" />
      </button>

      {open && <div className="filter-dropdown__panel">{children}</div>}
    </div>
  );
}
