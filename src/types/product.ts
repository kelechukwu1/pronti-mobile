export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  description?: string | null;
  category?: string | null;
  inStock: boolean;
}

export interface ProductsQueryData {
  products: Product[];
}

export interface ProductQueryData {
  product: Product | null;
}

export interface ProductQueryVars {
  id: string;
}
