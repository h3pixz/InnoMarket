export const SHOPS = [
  {
    id: 1,
    name: 'ReStyle Hub',
    location: '123A Gran Via',
    workHours: 'MO - FR: 9AM - 8PM | SA - SU: 9AM - 8PM',
    reservedTime: 'WED 14.04.2022 - FR 16.04.2022',
    freeShippingFrom: 34,
  },
  {
    id: 2,
    name: 'TrendTraders',
    location: 'Strada degli Arcobaleni',
    workHours: 'MO - FR: 9AM - 5PM | SA - SU: 11AM - 5PM',
    reservedTime: 'WED 14.04.2022 - FR 16.04.2022',
    freeShippingFrom: 50,
  },
];

export function getShopForProduct(product) {
  return SHOPS[product.id % SHOPS.length];
}
