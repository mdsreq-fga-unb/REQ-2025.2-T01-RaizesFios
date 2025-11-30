import api from "./api";

export interface Address {
  id: string;
  street: string;
  number: string;
  complement?: string;
  district: string;
  city: string;
  state: string;
  zipCode: string;
  isDefault: boolean;
  userId: string;
  recipientName?: string;
  phone?: string;
  referencePoint?: string;
}

export interface CreateAddressDTO {
  street: string;
  number: string;
  complement?: string;
  district: string;
  city: string;
  state: string;
  zipCode: string;
  isDefault?: boolean;
  recipientName: string;
  phone: string;
  referencePoint?: string;
}

export interface ViaCepResponse {
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
  ibge: string;
  gia: string;
  ddd: string;
  siafi: string;
  erro?: boolean;
}

export const addressService = {
  async list() {
    const response = await api.get<Address[]>("/addresses");
    return response.data;
  },

  async create(data: CreateAddressDTO) {
    const response = await api.post<Address>("/addresses", data);
    return response.data;
  },

  async update(id: string, data: Partial<CreateAddressDTO>) {
    const response = await api.put<Address>(`/addresses/${id}`, data);
    return response.data;
  },

  async delete(id: string) {
    await api.delete(`/addresses/${id}`);
  },

  async getAddressByCep(cep: string): Promise<ViaCepResponse> {
    // Remove caracteres não numéricos
    const cleanCep = cep.replace(/\D/g, "");
    
    if (cleanCep.length !== 8) {
      throw new Error("CEP inválido");
    }

    const response = await fetch(`https://viacep.com.br/ws/${cleanCep}/json/`);
    const data = await response.json();
    
    if (data.erro) {
        throw new Error("CEP não encontrado");
    }

    return data;
  },
};
