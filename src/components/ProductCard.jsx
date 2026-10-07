export default function ProductCard({ product }) {
  return (
    <article className="product-card">
      <img
        className="product-card__image"
        src={product.thumbnail}
        alt={product.title}
      />
      <h3 className="product-card__title">{product.title}</h3>
      <p className="product-card__brand">{product.brand}</p>
      <p className="product-card__price">${product.price}</p>
    </article>
  );
}
