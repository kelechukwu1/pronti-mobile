import type { Product } from '@/types';

const img = (seed: string): string =>
  `https://picsum.photos/seed/${seed}/400/400`;

export const MOCK_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Wireless Bluetooth Headphones',
    price: 99.99,
    image: img('headphones'),
    category: 'Electronics',
    inStock: true,
  },
  {
    id: '2',
    name: 'Smart Fitness Watch',
    price: 199.99,
    image: img('watch'),
    category: 'Electronics',
    inStock: true,
  },
  {
    id: '3',
    name: 'Premium Coffee Maker',
    price: 149.99,
    image: img('coffee'),
    category: 'Home',
    inStock: false,
  },
  {
    id: '4',
    name: 'Portable Bluetooth Speaker',
    price: 59.99,
    image: img('speaker'),
    category: 'Electronics',
    inStock: true,
  },
  {
    id: '5',
    name: 'Ergonomic Office Chair',
    price: 249.99,
    image: img('chair'),
    category: 'Home',
    inStock: true,
  },
  {
    id: '6',
    name: 'Stainless Steel Water Bottle',
    price: 24.99,
    image: img('bottle'),
    category: 'Lifestyle',
    inStock: true,
  },
  {
    id: '7',
    name: 'Mechanical Keyboard',
    price: 129.99,
    image: img('keyboard'),
    category: 'Electronics',
    inStock: false,
  },
  {
    id: '8',
    name: 'Scented Soy Candle',
    price: 18.99,
    image: img('candle'),
    category: 'Home',
    inStock: true,
  },
];
