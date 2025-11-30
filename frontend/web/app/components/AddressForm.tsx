"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Loader2, MapPin, Search, AlertCircle } from "lucide-react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { addressService } from "../services/addressService";

function cn(...inputs: (string | undefined | null | false)[]) {
  return twMerge(clsx(inputs));
}

const addressSchema = z.object({
  recipientName: z.string().min(3, "Nome do destinatário é obrigatório"),
  zipCode: z.string().min(8, "CEP inválido").max(9, "CEP inválido").regex(/^\d{5}-?\d{3}$/, "Formato inválido"),
  street: z.string().min(3, "Rua é obrigatória"),
  number: z.string().min(1, "Número é obrigatório"),
  complement: z.string().optional(),
  district: z.string().min(1, "Bairro é obrigatório"),
  city: z.string().min(1, "Cidade é obrigatória"),
  state: z.string().length(2, "UF inválida"),
  referencePoint: z.string().optional(),
  phone: z.string().min(10, "Telefone inválido"),
  isDefault: z.boolean().optional(),
});

export type AddressFormData = z.infer<typeof addressSchema>;

interface AddressFormProps {
  onSubmit: (data: AddressFormData) => void;
  initialData?: AddressFormData;
  isLoading?: boolean;
}

export default function AddressForm({ onSubmit, initialData, isLoading = false }: AddressFormProps) {
  const [isSearchingCep, setIsSearchingCep] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    setFocus,
    setError,
    clearErrors,
    watch,
    formState: { errors },
  } = useForm<AddressFormData>({
    resolver: zodResolver(addressSchema),
    defaultValues: initialData || {
      recipientName: "",
      zipCode: "",
      street: "",
      number: "",
      complement: "",
      district: "",
      city: "",
      state: "",
      referencePoint: "",
      phone: "",
      isDefault: false,
    },
  });

  // Atualiza o formulário se initialData mudar
  useEffect(() => {
      if (initialData) {
          Object.keys(initialData).forEach((key) => {
              setValue(key as keyof AddressFormData, initialData[key as keyof AddressFormData]);
          });
      }
  }, [initialData, setValue]);

  const zipCodeValue = watch("zipCode");

  const handleZipCodeBlur = async () => {
    const cep = zipCodeValue?.replace(/\D/g, "");

    if (cep?.length !== 8) {
      return;
    }

    setIsSearchingCep(true);
    clearErrors(["street", "district", "city", "state"]);

    try {
      const data = await addressService.getAddressByCep(cep);

      setValue("street", data.logradouro);
      setValue("district", data.bairro);
      setValue("city", data.localidade);
      setValue("state", data.uf);

      setFocus("number");
    } catch (error) {
       console.error("Erro ao buscar CEP:", error);
      setError("zipCode", { message: "CEP não encontrado ou erro ao buscar" });
    } finally {
      setIsSearchingCep(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-2xl mx-auto bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100">
      <div className="flex items-center gap-3 mb-6 border-b border-gray-100 pb-4">
        <div className="bg-terracotta/10 p-2 rounded-full">
          <MapPin className="w-6 h-6 text-terracotta" />
        </div>
        <div>
          <h2 className="text-xl font-serif font-bold text-brown-text">
            {initialData ? "Editar Endereço" : "Endereço de Entrega"}
          </h2>
          <p className="text-sm text-gray-500">Preencha os dados para entrega</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Nome do Destinatário */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-brown-text mb-1.5">Nome do Destinatário *</label>
          <input
            {...register("recipientName")}
            className={cn(
              "w-full rounded-lg px-4 py-2.5 border text-brown-text placeholder-gray-400 focus:outline-none focus:ring-1 transition bg-gray-50",
              errors.recipientName
                ? "border-red-300 focus:border-red-500 focus:ring-red-500"
                : "border-gray-200 focus:border-terracotta focus:ring-terracotta"
            )}
            placeholder="Ex: Maria Silva"
          />
          {errors.recipientName && (
            <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
              <AlertCircle className="w-3 h-3" /> {errors.recipientName.message}
            </p>
          )}
        </div>

        {/* CEP */}
        <div>
          <label className="block text-sm font-medium text-brown-text mb-1.5">CEP *</label>
          <div className="relative">
            <input
              {...register("zipCode")}
              onBlur={handleZipCodeBlur}
              maxLength={9}
              className={cn(
                "w-full rounded-lg pl-4 pr-10 py-2.5 border text-brown-text placeholder-gray-400 focus:outline-none focus:ring-1 transition bg-gray-50",
                errors.zipCode
                  ? "border-red-300 focus:border-red-500 focus:ring-red-500"
                  : "border-gray-200 focus:border-terracotta focus:ring-terracotta"
              )}
              placeholder="00000-000"
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
              {isSearchingCep ? (
                <Loader2 className="w-5 h-5 animate-spin text-terracotta" />
              ) : (
                <Search className="w-5 h-5" />
              )}
            </div>
          </div>
          {errors.zipCode && (
            <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
              <AlertCircle className="w-3 h-3" /> {errors.zipCode.message}
            </p>
          )}
        </div>

        {/* Telefone */}
        <div>
          <label className="block text-sm font-medium text-brown-text mb-1.5">Telefone de Contato *</label>
          <input
            {...register("phone")}
            className={cn(
              "w-full rounded-lg px-4 py-2.5 border text-brown-text placeholder-gray-400 focus:outline-none focus:ring-1 transition bg-gray-50",
              errors.phone
                ? "border-red-300 focus:border-red-500 focus:ring-red-500"
                : "border-gray-200 focus:border-terracotta focus:ring-terracotta"
            )}
            placeholder="(11) 99999-9999"
          />
          {errors.phone && (
            <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
              <AlertCircle className="w-3 h-3" /> {errors.phone.message}
            </p>
          )}
        </div>

        {/* Rua */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-brown-text mb-1.5">Rua *</label>
          <input
            {...register("street")}
            className={cn(
              "w-full rounded-lg px-4 py-2.5 border text-brown-text placeholder-gray-400 focus:outline-none focus:ring-1 transition bg-gray-50",
              errors.street
                ? "border-red-300 focus:border-red-500 focus:ring-red-500"
                : "border-gray-200 focus:border-terracotta focus:ring-terracotta"
            )}
            placeholder="Nome da rua"
          />
          {errors.street && (
            <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
              <AlertCircle className="w-3 h-3" /> {errors.street.message}
            </p>
          )}
        </div>

        {/* Número */}
        <div>
          <label className="block text-sm font-medium text-brown-text mb-1.5">Número *</label>
          <input
            {...register("number")}
            className={cn(
              "w-full rounded-lg px-4 py-2.5 border text-brown-text placeholder-gray-400 focus:outline-none focus:ring-1 transition bg-gray-50",
              errors.number
                ? "border-red-300 focus:border-red-500 focus:ring-red-500"
                : "border-gray-200 focus:border-terracotta focus:ring-terracotta"
            )}
            placeholder="123"
          />
          {errors.number && (
            <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
              <AlertCircle className="w-3 h-3" /> {errors.number.message}
            </p>
          )}
        </div>

        {/* Complemento */}
        <div>
          <label className="block text-sm font-medium text-brown-text mb-1.5">Complemento</label>
          <input
            {...register("complement")}
            className="w-full rounded-lg px-4 py-2.5 border border-gray-200 text-brown-text placeholder-gray-400 focus:outline-none focus:border-terracotta focus:ring-1 focus:ring-terracotta transition bg-gray-50"
            placeholder="Ap 101, Bloco B"
          />
        </div>

        {/* Bairro */}
        <div>
          <label className="block text-sm font-medium text-brown-text mb-1.5">Bairro *</label>
          <input
            {...register("district")}
            className={cn(
              "w-full rounded-lg px-4 py-2.5 border text-brown-text placeholder-gray-400 focus:outline-none focus:ring-1 transition bg-gray-50",
              errors.district
                ? "border-red-300 focus:border-red-500 focus:ring-red-500"
                : "border-gray-200 focus:border-terracotta focus:ring-terracotta"
            )}
            placeholder="Centro"
          />
          {errors.district && (
            <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
              <AlertCircle className="w-3 h-3" /> {errors.district.message}
            </p>
          )}
        </div>

        {/* Cidade */}
        <div className="grid grid-cols-3 gap-4 md:col-span-1">
          <div className="col-span-2">
            <label className="block text-sm font-medium text-brown-text mb-1.5">Cidade *</label>
            <input
              {...register("city")}
              className={cn(
                "w-full rounded-lg px-4 py-2.5 border text-brown-text placeholder-gray-400 focus:outline-none focus:ring-1 transition bg-gray-50",
                errors.city
                  ? "border-red-300 focus:border-red-500 focus:ring-red-500"
                  : "border-gray-200 focus:border-terracotta focus:ring-terracotta"
              )}
              placeholder="Cidade"
            />
            {errors.city && (
              <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" /> {errors.city.message}
              </p>
            )}
          </div>
          {/* Estado */}
          <div>
            <label className="block text-sm font-medium text-brown-text mb-1.5">UF *</label>
            <input
              {...register("state")}
              maxLength={2}
              className={cn(
                "w-full rounded-lg px-4 py-2.5 border text-brown-text placeholder-gray-400 focus:outline-none focus:ring-1 transition bg-gray-50 uppercase",
                errors.state
                  ? "border-red-300 focus:border-red-500 focus:ring-red-500"
                  : "border-gray-200 focus:border-terracotta focus:ring-terracotta"
              )}
              placeholder="UF"
            />
            {errors.state && (
              <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" /> {errors.state.message}
              </p>
            )}
          </div>
        </div>

        {/* Ponto de Referência */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-brown-text mb-1.5">Ponto de Referência</label>
          <input
            {...register("referencePoint")}
            className="w-full rounded-lg px-4 py-2.5 border border-gray-200 text-brown-text placeholder-gray-400 focus:outline-none focus:border-terracotta focus:ring-1 focus:ring-terracotta transition bg-gray-50"
            placeholder="Próximo ao mercado..."
          />
        </div>

        {/* Checkbox Padrão */}
        <div className="md:col-span-2 mt-2">
          <label className="flex items-center gap-2 cursor-pointer group">
            <div className="relative">
              <input 
                type="checkbox"
                {...register("isDefault")}
                className="peer sr-only" 
              />
              <div className="w-5 h-5 border-2 border-gray-300 rounded peer-checked:bg-terracotta peer-checked:border-terracotta transition"></div>
              <svg 
                className="w-3.5 h-3.5 text-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 peer-checked:opacity-100 transition pointer-events-none"
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor" 
                strokeWidth={3}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <span className="text-sm text-brown-text font-medium group-hover:text-terracotta transition">
              Definir como endereço padrão de entrega
            </span>
          </label>
        </div>
      </div>

      <div className="mt-8">
        <button
          type="submit"
          disabled={isLoading || isSearchingCep}
          className="w-full bg-terracotta text-white font-bold py-3 rounded-lg hover:bg-terracotta-dark transition duration-200 transform hover:scale-[1.01] disabled:opacity-70 disabled:cursor-not-allowed shadow-md flex justify-center items-center gap-2"
        >
          {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Salvar Endereço"}
        </button>
      </div>
    </form>
  );
}
