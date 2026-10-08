import '../styles/breadcrumbs.css';

const DEFAULT_CRUMBS = ['Home', 'Woman', 'Accessories'];

export default function Breadcrumbs({ items = DEFAULT_CRUMBS }) {
  return (
    <nav className="breadcrumbs" aria-label="Breadcrumb">
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
