export interface Product {
  id: number;
  name: string;
  description?: string;
  price: number;
  
  // Campos da API
  sku?: string;
  imageUrl?: string; // API
  active?: boolean;
  categoryId?: number; // API
  category?: { id: number; name: string } | string; // API (obj) ou Mock (string)

  // Campos Legacy/Mock (para compatibilidade com carrinho existente)
  image?: string; // Mock
  images?: string[];
  dimensions?: string;
  material?: string;
  longDescription?: string;
}

export interface ProductCardProps {
  id?: number;
  image: string;
  title: string;
  subtitle?: string;
  price?: number;
}
