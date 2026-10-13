import '../styles/breadcrumbs.css';

const DEFAULT_CRUMBS = ['Home', 'Woman', 'Accessories'];

export default function Breadcrumbs({ items = DEFAULT_CRUMBS, variant }) {
  const className = variant
    ? `breadcrumbs breadcrumbs--${variant}`
    : 'breadcrumbs';

  return (
    <nav className={className} aria-label="Breadcrumb">
      {items.map((crumb, index) => {
        const isLast = index === items.length - 1;
        return (
          <span key={index} className="breadcrumbs__item">
            {index > 0 && <span className="breadcrumbs__separator">&gt;</span>}
            <span
              className={
                isLast
                  ? 'breadcrumbs__crumb breadcrumbs__crumb--current'
                  : 'breadcrumbs__crumb'
              }
            >
              {crumb}
            </span>
          </span>
        );
      })}
    </nav>
  );
}
