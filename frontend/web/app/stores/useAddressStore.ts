import { create } from 'zustand';
import { addressService, Address, CreateAddressDTO } from '../services/addressService';
import { AddressFormData } from '../components/AddressForm';

interface AddressState {
  addresses: Address[];
  isLoadingAddresses: boolean;
  isSavingAddress: boolean;
  showAddressForm: boolean;
  editingAddress: Address | null;

  // Actions
  loadAddresses: () => Promise<void>;
  saveAddress: (data: AddressFormData) => Promise<void>;
  deleteAddress: (id: string) => Promise<void>;
  openCreateForm: () => void;
  openEditForm: (address: Address) => void;
  closeForm: () => void;
}

export const useAddressStore = create<AddressState>((set, get) => ({
  addresses: [],
  isLoadingAddresses: false,
  isSavingAddress: false,
  showAddressForm: false,
  editingAddress: null,

  loadAddresses: async () => {
    set({ isLoadingAddresses: true });
    try {
      const data = await addressService.list();
      set({ addresses: data });
    } catch (error) {
      console.error("Erro ao carregar endereços:", error);
    } finally {
      set({ isLoadingAddresses: false });
    }
  },

  saveAddress: async (data: AddressFormData) => {
    set({ isSavingAddress: true });
    const { editingAddress, loadAddresses } = get();
    
    try {
      // Remove formatação de CEP para envio
      const formattedData: CreateAddressDTO = {
        ...data,
        zipCode: data.zipCode.replace(/\D/g, ""),
      };

      if (editingAddress) {
        await addressService.update(editingAddress.id, formattedData);
      } else {
        await addressService.create(formattedData);
      }

      await loadAddresses();
      set({ showAddressForm: false, editingAddress: null });
    } catch (error) {
      console.error("Erro ao salvar endereço:", error);
      throw error; // Relança erro para que o componente possa exibir alert/toast se necessário
    } finally {
      set({ isSavingAddress: false });
    }
  },

  deleteAddress: async (id: string) => {
    const { addresses } = get();
    // Otimista: remove localmente antes (opcional), ou espera confirmação. 
    // Aqui vou esperar confirmação para garantir sincronia.
    try {
      await addressService.delete(id);
      set({ addresses: addresses.filter(addr => addr.id !== id) });
    } catch (error) {
      console.error("Erro ao deletar endereço:", error);
      throw error;
    }
  },

  openCreateForm: () => {
    set({ showAddressForm: true, editingAddress: null });
  },

  openEditForm: (address: Address) => {
    set({ showAddressForm: true, editingAddress: address });
  },

  closeForm: () => {
    set({ showAddressForm: false, editingAddress: null });
  },
}));

