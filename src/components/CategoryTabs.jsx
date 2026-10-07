import { useState } from 'react';
import '../styles/category-tabs.css';

const TABS = ['Women', 'Men', 'Unisex', 'Children', 'New'];

export default function CategoryTabs() {
  const [active, setActive] = useState(TABS[0]);

  return (
    <div className="category-tabs">
      <div className="category-tabs__list">
        {TABS.map((tab) => (
          <button
            key={tab}
            type="button"
            className={
              tab === active
                ? 'category-tabs__tab category-tabs__tab--active'
                : 'category-tabs__tab'
            }
            onClick={() => setActive(tab)}
          >
            {tab}
          </button>
        ))}
      </div>
    </div>
  );
}
