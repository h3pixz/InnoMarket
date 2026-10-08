import '../styles/filters.css';

function formatPriceChip(price) {
  if (price.min && price.max) return `${price.min} – ${price.max} €`;
  if (price.min) return `from ${price.min} €`;
  return `to ${price.max} €`;
}

export default function FilterChips({
  selectedColors,
  onRemoveColor,
  price,
  onClearPrice,
}) {
  const hasPrice = Boolean(price.min || price.max);

  if (!selectedColors.length && !hasPrice) return null;

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
