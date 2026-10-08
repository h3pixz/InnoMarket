const COLORS = ['Black', 'White', 'Red', 'Brown', 'Grey', 'Green', 'Blue'];
const DELIVERY = ['1-3 working days', '1-5 working days'];

export function getMockDetails(product) {
  const seed = product.id;
  const color = COLORS[seed % COLORS.length];
  const deliveryTime = DELIVERY[seed % DELIVERY.length];
  const tags = seed % 3 === 0 ? ['New', 'Reserved'] : ['New'];
  return { color, deliveryTime, tags };
}
