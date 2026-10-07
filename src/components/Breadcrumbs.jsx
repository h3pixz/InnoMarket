import '../styles/breadcrumbs.css';

const CRUMBS = ['Home', 'Woman', 'Accessories'];

export default function Breadcrumbs() {
  return (
    <nav className="breadcrumbs" aria-label="Breadcrumb">
      {CRUMBS.map((crumb, index) => (
        <span key={crumb} className="breadcrumbs__item">
          {index > 0 && <span className="breadcrumbs__separator">&gt;</span>}
          <span
            className={
              index === CRUMBS.length - 1
                ? 'breadcrumbs__crumb breadcrumbs__crumb--current'
                : 'breadcrumbs__crumb'
            }
          >
            {crumb}
          </span>
        </span>
      ))}
    </nav>
  );
}
