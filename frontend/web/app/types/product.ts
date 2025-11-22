export interface Product {
  id: number;
  name: string;
  description?: string;
  price?: number;
  image: string;
  category?: string;
}

export interface ProductCardProps {
  image: string;
  title: string;
  subtitle?: string;
}

