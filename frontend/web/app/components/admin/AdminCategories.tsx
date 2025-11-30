import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { categoryService, Category } from "../../services/categoryService";
import { Loader2, Plus, Trash2, AlertCircle } from "lucide-react";
import { categoryFormSchema, CategoryFormData } from "../../schemas/category.schema";

export default function AdminCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting, errors, isValid },
  } = useForm<CategoryFormData>({
    resolver: zodResolver(categoryFormSchema),
    defaultValues: {
      name: "",
    },
    mode: "onChange"
  });

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    setIsLoading(true);
    try {
      const data = await categoryService.getAll();
      setCategories(data);
    } catch (err) {
      console.error(err);
      setError("Erro ao carregar categorias.");
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmit = async (data: CategoryFormData) => {
    setError("");
    try {
      await categoryService.create({ name: data.name });
      reset();
      await loadCategories();
    } catch (err: any) {
      console.error(err);
      const message = err.response?.data?.error || err.response?.data?.message || "Erro ao criar categoria.";
      setError(message);
    }
  };

  return (
    <div className="animate-fade-in space-y-6">
      <div className="flex justify-between items-center border-b border-gray-100 pb-4">
        <h2 className="text-2xl font-serif font-bold text-brown-text">Gerenciar Categorias</h2>
      </div>

      {/* Create Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="bg-gray-50 p-4 rounded-xl border border-gray-100 flex gap-4 items-start">
        <div className="flex-1">
          <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-1">
            Nova Categoria
          </label>
          <input
            {...register("name")}
            placeholder="Ex: Shampoos"
            className={`w-full px-4 py-2 rounded-lg border ${errors.name ? "border-red-500" : "border-gray-200"} focus:outline-hidden focus:ring-2 focus:ring-terracotta/20 focus:border-terracotta transition`}
          />
          {errors.name && <span className="text-xs text-red-500 mt-1 block">{errors.name.message}</span>}
        </div>
        <button
          type="submit"
          disabled={isSubmitting || !isValid}
          className="bg-terracotta text-white px-4 py-2 rounded-lg font-bold hover:bg-terracotta-dark transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 h-[42px] mt-[22px]"
        >
          {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
          Adicionar
        </button>
      </form>

      {error && (
        <div className="bg-red-50 text-red-600 p-3 rounded-lg flex items-center gap-2 text-sm">
          <AlertCircle className="w-4 h-4" />
          {error}
        </div>
      )}

      {/* List */}
      {isLoading ? (
        <div className="flex justify-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-terracotta" />
        </div>
      ) : categories.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          Nenhuma categoria encontrada.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map((cat) => (
            <div key={cat.id} className="bg-white p-4 rounded-xl border border-gray-100 flex justify-between items-center shadow-sm hover:shadow-md transition">
              <span className="font-medium text-brown-text">{cat.name}</span>
              {/* Delete button placeholder - disabled since backend doesn't support it yet */}
              <button disabled className="text-gray-300 cursor-not-allowed p-2" title="Exclusão não disponível">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
