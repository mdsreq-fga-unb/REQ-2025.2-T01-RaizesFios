import api from "./api";

export interface Category {
  id: number;
  name: string;
  description?: string;
}

export interface CreateCategoryData {
  name: string;
}

export const categoryService = {
  async getAll() {
    const response = await api.get<Category[]>("/categories");
    return response.data;
  },

  async create(data: CreateCategoryData) {
    const response = await api.post<Category>("/categories", data);
    return response.data;
  },
  
  async delete(id: number) {
    // const response = await api.delete(`/categories/${id}`);
    // return response.data;
    console.warn("Delete category not implemented on backend yet");
  },

  async update(id: number, data: Partial<Category>) {
    // const response = await api.put(`/categories/${id}`, data);
    // return response.data;
    console.warn("Update category not implemented on backend yet");
  }
};

