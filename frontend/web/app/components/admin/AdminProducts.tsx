import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { productService, Product, UpdateProductData } from "../../services/productService";
import { categoryService, Category } from "../../services/categoryService";
import MoneyInput from "../MoneyInput";
import { Loader2, Plus, Trash2, Edit2, Search, X, Image as ImageIcon, Save } from "lucide-react";
import { productFormSchema, ProductFormData } from "../../schemas/product.schema";
import Image from "next/image";

export default function AdminProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<ProductFormData>({
    resolver: zodResolver(productFormSchema) as any,
    defaultValues: {
      name: "",
      description: "",
      price: 0,
      sku: "",
      imageUrl: "",
      categoryId: 0,
      active: true,
    },
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    try {
      const [prods, cats] = await Promise.all([
        productService.getAll(),
        categoryService.getAll()
      ]);
      setProducts(prods);
      setCategories(cats);
    } catch (err) {
      console.error("Erro ao carregar dados", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const data = await productService.getAll(searchTerm);
      setProducts(data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Tem certeza que deseja excluir este produto?")) return;
    try {
      await productService.delete(id);
      setProducts(products.filter(p => p.id !== id));
    } catch (err) {
      alert("Erro ao excluir produto");
      console.error(err);
    }
  };

  const openModal = (product?: Product) => {
    if (product) {
      setEditingProduct(product);
      reset({
        name: product.name,
        description: product.description || "",
        price: Number(product.price),
        sku: product.sku,
        imageUrl: product.imageUrl || "",
        categoryId: product.categoryId,
        active: product.active ?? true,
      });
    } else {
      setEditingProduct(null);
      reset({
        name: "",
        description: "",
        price: 0,
        sku: "",
        imageUrl: "",
        categoryId: 0,
        active: true,
      });
    }
    setIsModalOpen(true);
  };

  const onSubmit: import("react-hook-form").SubmitHandler<ProductFormData> = async (data) => {
    setIsSaving(true);
    try {
      const payload = {
        ...data,
        active: data.active ?? true
      };

      if (editingProduct) {
        const updateData: UpdateProductData = payload;
        await productService.update(editingProduct.id, updateData);
      } else {
        await productService.create(payload);
      }
      setIsModalOpen(false);
      loadData(); 
    } catch (err: any) {
      console.error("Erro ao salvar produto", err);
      const message = err.response?.data?.error || "Erro ao salvar produto. Verifique os dados.";
      alert(message);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="animate-fade-in space-y-6">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 border-b border-gray-100 pb-4">
        <h2 className="text-2xl font-serif font-bold text-brown-text">Gerenciar Produtos</h2>
        <button 
          onClick={() => openModal()}
          className="bg-terracotta text-white px-4 py-2 rounded-lg font-bold hover:bg-terracotta-dark transition flex items-center gap-2"
        >
          <Plus className="w-4 h-4" /> Novo Produto
        </button>
      </div>

      {/* Search */}
      <form onSubmit={handleSearch} className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Buscar produtos..."
          className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-hidden focus:ring-2 focus:ring-terracotta/20 focus:border-terracotta"
        />
      </form>

      {/* List */}
      {isLoading ? (
        <div className="flex justify-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-terracotta" />
        </div>
      ) : products.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          Nenhum produto encontrado.
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="px-6 py-3 text-xs font-bold uppercase tracking-wider text-gray-500">Produto</th>
                <th className="px-6 py-3 text-xs font-bold uppercase tracking-wider text-gray-500">Categoria</th>
                <th className="px-6 py-3 text-xs font-bold uppercase tracking-wider text-gray-500">Preço</th>
                <th className="px-6 py-3 text-xs font-bold uppercase tracking-wider text-gray-500 text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {products.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50/50 transition">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden shrink-0 relative">
                        {product.imageUrl ? (
                          <Image 
                            src={product.imageUrl} 
                            alt={product.name} 
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <ImageIcon className="w-5 h-5 text-gray-400" />
                        )}
                      </div>
                      <div>
                        <div className="font-medium text-brown-text">{product.name}</div>
                        <div className="text-xs text-gray-400">SKU: {product.sku}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {categories.find(c => c.id === product.categoryId)?.name || "Sem Categoria"}
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-brown-text">
                    R$ {Number(product.price).toFixed(2)}
                  </td>
                  <td className="px-6 py-4 text-right space-x-2">
                    <button 
                      onClick={() => openModal(product)}
                      className="text-gray-400 hover:text-terracotta transition"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => handleDelete(product.id)}
                      className="text-gray-400 hover:text-red-500 transition"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto animate-slide-in-up">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50 rounded-t-2xl sticky top-0">
              <h3 className="text-lg font-bold text-brown-text font-serif">
                {editingProduct ? "Editar Produto" : "Novo Produto"}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-terracotta transition">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                 <div className="col-span-2">
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-1">Nome</label>
                    <input
                      {...register("name")}
                      className={`w-full px-4 py-2 rounded-lg border ${errors.name ? "border-red-500" : "border-gray-200"} focus:outline-hidden focus:ring-2 focus:ring-terracotta/20 focus:border-terracotta`}
                    />
                    {errors.name && <span className="text-xs text-red-500">{errors.name.message}</span>}
                 </div>

                 <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-1">SKU</label>
                    <input
                      {...register("sku")}
                      className={`w-full px-4 py-2 rounded-lg border ${errors.sku ? "border-red-500" : "border-gray-200"} focus:outline-hidden focus:ring-2 focus:ring-terracotta/20 focus:border-terracotta`}
                    />
                    {errors.sku && <span className="text-xs text-red-500">{errors.sku.message}</span>}
                 </div>

                 <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-1">Preço</label>
                    <Controller
                      name="price"
                      control={control}
                      render={({ field }) => (
                        <MoneyInput
                          value={field.value ?? 0}
                          onChange={field.onChange}
                          className={`w-full px-4 py-2 rounded-lg border ${errors.price ? "border-red-500" : "border-gray-200"} focus:outline-hidden focus:ring-2 focus:ring-terracotta/20 focus:border-terracotta`}
                        />
                      )}
                    />
                    {errors.price && <span className="text-xs text-red-500">{errors.price.message}</span>}
                 </div>

                 <div className="col-span-2">
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-1">Categoria</label>
                    <select
                      {...register("categoryId")}
                      className={`w-full px-4 py-2 rounded-lg border ${errors.categoryId ? "border-red-500" : "border-gray-200"} focus:outline-hidden focus:ring-2 focus:ring-terracotta/20 focus:border-terracotta bg-white`}
                    >
                      <option value={0}>Selecione...</option>
                      {categories.map(cat => (
                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                      ))}
                    </select>
                    {errors.categoryId && <span className="text-xs text-red-500">{errors.categoryId.message}</span>}
                 </div>

                 <div className="col-span-2">
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-1">URL da Imagem</label>
                    <input
                      {...register("imageUrl")}
                      placeholder="https://..."
                      className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-hidden focus:ring-2 focus:ring-terracotta/20 focus:border-terracotta"
                    />
                 </div>

                 <div className="col-span-2">
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-1">Descrição</label>
                    <textarea
                      {...register("description")}
                      rows={3}
                      className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-hidden focus:ring-2 focus:ring-terracotta/20 focus:border-terracotta"
                    />
                 </div>

                 <div className="col-span-2 flex items-center gap-2 mt-2">
                   <input
                      type="checkbox"
                      id="active"
                      {...register("active")}
                      className="w-4 h-4 text-terracotta rounded focus:ring-terracotta"
                   />
                   <label htmlFor="active" className="text-sm text-gray-600 cursor-pointer select-none">Produto Ativo (Visível no catálogo)</label>
                 </div>
              </div>

              <div className="pt-4 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-gray-500 hover:text-gray-700 font-medium"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="bg-terracotta text-white px-6 py-2 rounded-lg font-bold hover:bg-terracotta-dark transition shadow-md flex items-center gap-2"
                >
                  {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                  Salvar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
