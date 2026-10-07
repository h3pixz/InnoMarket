const SIZES = ['XS', 'S', 'M', 'L', 'XL', '36', '36,5', '38', '42', '44'];

export function getMockDetails(product) {
  const seed = product.id;
  const size = SIZES[seed % SIZES.length];
  const tags = seed % 3 === 0 ? ['New', 'Reserved'] : ['New'];
  return { size, tags };
}
