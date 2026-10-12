import '../styles/filters.css';

function formatPriceChip(price) {
  if (price.min && price.max) return `${price.min} – ${price.max} €`;
  if (price.min) return `from ${price.min} €`;
  return `to ${price.max} €`;
}

export default function FilterChips({
  selectedColors,
  onRemoveColor,
  selectedBrands,
  onRemoveBrand,
  selectedCategory,
  onClearCategory,
  saleActive,
  onClearSale,
  price,
  onClearPrice,
}) {
  const hasPrice = Boolean(price.min || price.max);
  const isEmpty =
    !selectedColors.length &&
    !selectedBrands.length &&
    !selectedCategory &&
    !saleActive &&
    !hasPrice;

  if (isEmpty) return null;

  return (
    <div className="filter-chips">
      {selectedColors.map((color) => (
        <button
          key={color}
          type="button"
          className="filter-chips__chip"
          onClick={() => onRemoveColor(color)}
        >
          <span>{color}</span>
          <span className="filter-chips__close">&times;</span>
        </button>
      ))}

      {selectedBrands.map((brand) => (
        <button
          key={brand}
          type="button"
          className="filter-chips__chip"
          onClick={() => onRemoveBrand(brand)}
        >
          <span>{brand}</span>
          <span className="filter-chips__close">&times;</span>
        </button>
      ))}

      {selectedCategory && (
        <button
          type="button"
          className="filter-chips__chip"
          onClick={onClearCategory}
        >
          <span>{selectedCategory}</span>
          <span className="filter-chips__close">&times;</span>
        </button>
      )}

      {saleActive && (
        <button
          type="button"
          className="filter-chips__chip"
          onClick={onClearSale}
        >
          <span>Sale ≥ 10%</span>
          <span className="filter-chips__close">&times;</span>
        </button>
      )}

      {hasPrice && (
        <button
          type="button"
          className="filter-chips__chip"
          onClick={onClearPrice}
        >
          <span>{formatPriceChip(price)}</span>
          <span className="filter-chips__close">&times;</span>
        </button>
      )}
    </div>
  );
}
