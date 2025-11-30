export interface Product {
  id: number;
  name: string;
  description?: string;
  longDescription?: string;
  price?: number;
  image: string;
  images?: string[];
  category?: string;
  dimensions?: string;
  material?: string;
}

export interface ProductCardProps {
  image: string;
  title: string;
  subtitle?: string;
}
