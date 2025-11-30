import api from "./api";

export interface Product {
  id: number;
  name: string;
  description?: string;
  price: number;
  sku: string;
  imageUrl?: string;
  active?: boolean;
  categoryId: number;
  category?: {
    id: number;
    name: string;
  };
}

export interface CreateProductData {
  name: string;
  description?: string;
  price: number;
  sku: string;
  imageUrl?: string;
  active?: boolean;
  categoryId: number;
}

export interface UpdateProductData {
  name?: string;
  description?: string;
  price?: number;
  sku?: string;
  imageUrl?: string;
  active?: boolean;
  categoryId?: number;
}

export const productService = {
  async getAll(search?: string, active?: boolean) {
    const params: any = {};
    if (search) params.search = search;
    if (active !== undefined) params.active = active;
    
    const response = await api.get<Product[]>("/products", { params });
    return response.data;
  },

  async getById(id: number) {
    const response = await api.get<Product>(`/products/${id}`);
    return response.data;
  },

  async create(data: CreateProductData) {
    const response = await api.post<Product>("/products", data);
    return response.data;
  },

  async update(id: number, data: UpdateProductData) {
    const response = await api.put<Product>(`/products/${id}`, data);
    return response.data;
  },

  async delete(id: number) {
    await api.delete(`/products/${id}`);
  }
};
