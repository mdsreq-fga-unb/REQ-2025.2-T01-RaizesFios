export interface Address {
  id: string;
  recipientName: string;
  phone: string;
  street: string;
  number: string;
  complement?: string | null;
  referencePoint?: string | null;
  district: string;
  city: string;
  state: string;
  zipCode: string;
  isDefault: boolean;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateAddressDTO {
  recipientName: string;
  phone: string;
  street: string;
  number: string;
  complement?: string;
  referencePoint?: string;
  district: string;
  city: string;
  state: string;
  zipCode: string;
  isDefault?: boolean;
}

export interface UpdateAddressDTO {
  recipientName?: string;
  phone?: string;
  street?: string;
  number?: string;
  complement?: string;
  referencePoint?: string;
  district?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  isDefault?: boolean;
}
