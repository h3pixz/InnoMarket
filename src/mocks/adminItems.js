const SUBCATEGORIES = [
  'Sneakers',
  'Jeans',
  'Handbags',
  'Wrap Dress',
  'Hoodie',
  'Midi Skirt',
  'Running Shoes',
  'Boxer Briefs',
  'Polo Shirt',
  'T-Shirt',
];

const STORAGE = [
  'Austria 459 Maudie Islands Suite 854 Pacocha',
  'Germany 128 Willow Creek Suite 402 Schneider',
  'France 77 Harbour Avenue Unit 210 Legros',
  'Spain 34 Sunset Boulevard Suite 918 Weissnat',
];

const STATUSES = [
  { label: 'In Sale', key: 'sale' },
  { label: 'In Progress', key: 'progress' },
  { label: 'Locked', key: 'locked' },
  { label: 'Reserved', key: 'reserved' },
  { label: 'Sold', key: 'sold' },
  { label: 'Closed Out', key: 'closed' },
];

export function getMockAdminRow(product) {
  const seed = product.id;
  const status = STATUSES[seed % STATUSES.length];
  return {
    items: (seed % 2) + 1,
    subcategory: SUBCATEGORIES[seed % SUBCATEGORIES.length],
    storage: STORAGE[seed % STORAGE.length],
    status: status.label,
    statusKey: status.key,
  };
}
