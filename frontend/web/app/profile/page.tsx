"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "../stores/useAuthStore";
import { useAddressStore } from "../stores/useAddressStore";
import AddressForm, { AddressFormData } from "../components/AddressForm";
import Header from "../components/Header";
import { User, MapPin, LogOut, Plus, Trash2, Loader2, ChevronRight, Edit2, Package } from "lucide-react";
import { authService } from "../services/authService";

export default function ProfilePage() {
  const router = useRouter();
  const { user, isAuthenticated, logout, hasHydrated } = useAuthStore();
  const {
    addresses,
    isLoadingAddresses,
    isSavingAddress,
    showAddressForm,
    editingAddress,
    loadAddresses,
    saveAddress,
    deleteAddress,
    openCreateForm,
    openEditForm,
    closeForm
  } = useAddressStore();

  const [activeTab, setActiveTab] = useState<"profile" | "addresses">("profile");

  // Redirecionar se não estiver logado (apenas após hidratação)
  useEffect(() => {
    if (hasHydrated && !isAuthenticated) {
      router.push("/auth/login");
    }
  }, [hasHydrated, isAuthenticated, router]);

  // Carregar endereços quando a aba mudar para endereços
  useEffect(() => {
    if (activeTab === "addresses" && isAuthenticated) {
      loadAddresses();
    }
  }, [activeTab, isAuthenticated, loadAddresses]);

  const handleLogout = async () => {
    try {
      await authService.logout();
    } catch (error) {
      console.error("Erro no logout", error);
    }
    logout();
    router.push("/auth/login");
  };

  const handleSaveAddress = async (data: AddressFormData) => {
    try {
      await saveAddress(data);
    } catch (error) {
      alert("Erro ao salvar endereço. Tente novamente.",);
      console.error("Erro ao salvar endereço:", error);
    }
  };

  const handleDeleteAddress = async (id: string) => {
    if (!confirm("Tem certeza que deseja excluir este endereço?")) return;

    try {
      await deleteAddress(id);
    } catch (error) {
      alert("Erro ao deletar endereço.");
      console.error("Erro ao deletar endereço:", error);
    }
  };

  // Aguardar hidratação antes de renderizar ou redirecionar
  if (!hasHydrated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-cream">
        <Loader2 className="w-8 h-8 animate-spin text-terracotta" />
      </div>
    );
  }

  if (!isAuthenticated || !user) {
    return null; 
  }

  return (
    <div className="min-h-screen bg-gray-50/50">
      <Header />

      <div className="container mx-auto px-4 py-8 md:py-12">
        <h1 className="text-3xl font-serif font-bold text-brown-text mb-8">Minha Conta</h1>
        
        <div className="flex flex-col md:flex-row gap-6">
          
          {/* Sidebar */}
          <aside className="md:w-72 shrink-0">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden sticky top-24">
              <div className="p-6 bg-linear-to-br from-terracotta/5 to-transparent border-b border-gray-100 flex flex-col items-center text-center">
                 <div className="w-20 h-20 bg-terracotta/10 rounded-full flex items-center justify-center mb-3 text-terracotta">
                    <User className="w-10 h-10" />
                 </div>
                 <h3 className="font-bold text-brown-text text-lg">{user.name.split(' ')[0]}</h3>
                 <p className="text-sm text-gray-500 truncate max-w-full px-2">{user.email}</p>
              </div>

              <nav className="p-2 space-y-1">
                <button
                  onClick={() => setActiveTab("profile")}
                  className={`w-full text-left px-4 py-3 rounded-lg flex items-center justify-between group transition duration-200 ${
                    activeTab === "profile"
                      ? "bg-terracotta text-white shadow-md"
                      : "text-brown-text hover:bg-orange-50"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <User className={`w-5 h-5 ${activeTab === 'profile' ? 'text-white' : 'text-terracotta'}`} />
                    <span className="font-medium">Meus Dados</span>
                  </div>
                  {activeTab === "profile" && <ChevronRight className="w-4 h-4 opacity-50" />}
                </button>
                
                <button
                  onClick={() => setActiveTab("addresses")}
                  className={`w-full text-left px-4 py-3 rounded-lg flex items-center justify-between group transition duration-200 ${
                    activeTab === "addresses"
                      ? "bg-terracotta text-white shadow-md"
                      : "text-brown-text hover:bg-orange-50"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <MapPin className={`w-5 h-5 ${activeTab === 'addresses' ? 'text-white' : 'text-terracotta'}`} />
                    <span className="font-medium">Endereços</span>
                  </div>
                   {activeTab === "addresses" && <ChevronRight className="w-4 h-4 opacity-50" />}
                </button>

                 <button
                  disabled
                  className="w-full text-left px-4 py-3 rounded-lg flex items-center justify-between text-gray-400 cursor-not-allowed hover:bg-gray-50 transition"
                >
                  <div className="flex items-center gap-3">
                    <Package className="w-5 h-5" />
                    <span className="font-medium">Meus Pedidos (Em breve)</span>
                  </div>
                </button>

                <div className="my-2 border-t border-gray-100 mx-4"></div>

                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-3 rounded-lg flex items-center gap-3 text-red-600 hover:bg-red-50 transition font-medium"
                >
                  <LogOut className="w-5 h-5" />
                  Sair da conta
                </button>
              </nav>
            </div>
          </aside>

          {/* Conteúdo Principal */}
          <main className="flex-1">
            {activeTab === "profile" && (
              <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100 animate-fade-in">
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-100">
                   <h2 className="text-2xl font-serif font-bold text-brown-text">Dados Pessoais</h2>
                   <button className="text-terracotta hover:text-terracotta-dark text-sm font-bold flex items-center gap-1 transition">
                      <Edit2 className="w-4 h-4" /> Editar
                   </button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                  <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-1">Nome Completo</label>
                    <p className="text-lg text-brown-text font-medium">{user.name}</p>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-1">E-mail</label>
                    <p className="text-lg text-brown-text font-medium break-all">{user.email}</p>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                     <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-1">Tipo de Conta</label>
                     <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide mt-1 ${user.role === 'ADMIN' ? 'bg-purple-100 text-purple-700' : 'bg-green-100 text-green-700'}`}>
                        {user.role === 'ADMIN' ? 'Administrador' : 'Cliente'}
                     </span>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "addresses" && (
              <div className="space-y-6 animate-fade-in">
                <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
                  <div>
                    <h2 className="text-2xl font-serif font-bold text-brown-text">Meus Endereços</h2>
                    <p className="text-gray-500 text-sm mt-1">Gerencie seus endereços de entrega</p>
                  </div>
                  {!showAddressForm && (
                    <button
                      onClick={openCreateForm}
                      className="flex items-center justify-center gap-2 bg-terracotta text-white px-6 py-3 rounded-lg hover:bg-terracotta-dark transition font-bold shadow-md transform hover:scale-[1.02]"
                    >
                      <Plus className="w-5 h-5" />
                      Novo Endereço
                    </button>
                  )}
                </div>

                {showAddressForm ? (
                  <div className="bg-white p-1 rounded-2xl border border-gray-100 shadow-sm animate-slide-in-up">
                    <div className="flex justify-end mb-0 px-6 pt-4">
                        <button onClick={closeForm} className="text-sm text-gray-400 hover:text-terracotta transition font-medium flex items-center gap-1">
                          ✕ Cancelar
                        </button>
                    </div>
                    <AddressForm 
                      onSubmit={handleSaveAddress} 
                      isLoading={isSavingAddress} 
                      initialData={editingAddress ? {
                        ...editingAddress,
                        recipientName: editingAddress.recipientName || "",
                        phone: editingAddress.phone || "",
                        complement: editingAddress.complement || "",
                        referencePoint: editingAddress.referencePoint || "",
                      } : undefined}
                    />
                  </div>
                ) : (
                  <>
                    {isLoadingAddresses ? (
                      <div className="flex justify-center py-20">
                        <div className="flex flex-col items-center gap-3">
                           <Loader2 className="w-10 h-10 animate-spin text-terracotta" />
                           <span className="text-gray-400 text-sm font-medium">Carregando endereços...</span>
                        </div>
                      </div>
                    ) : addresses.length === 0 ? (
                      <div className="bg-white p-12 rounded-2xl text-center border border-dashed border-gray-300 flex flex-col items-center">
                        <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                           <MapPin className="w-8 h-8 text-gray-300" />
                        </div>
                        <h3 className="text-lg font-bold text-brown-text mb-1">Nenhum endereço cadastrado</h3>
                        <p className="text-gray-500 mb-6 max-w-xs mx-auto">Cadastre seu endereço para agilizar suas compras.</p>
                        <button
                          onClick={openCreateForm}
                          className="text-terracotta font-bold hover:underline hover:text-terracotta-dark transition"
                        >
                          Cadastrar agora
                        </button>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 gap-4">
                        {addresses.map((addr) => (
                          <div 
                            key={addr.id} 
                            className={`bg-white p-6 rounded-xl border transition relative group flex flex-col md:flex-row md:items-start md:justify-between gap-4 ${
                              addr.isDefault 
                                ? "border-terracotta ring-1 ring-terracotta/30 shadow-sm" 
                                : "border-gray-100 hover:border-orange-200 hover:shadow-sm"
                            }`}
                          >
                            <div className="flex-1">
                                <div className="flex items-center gap-3 mb-2">
                                  <h3 className="font-bold text-lg text-brown-text flex items-center gap-2">
                                    <MapPin className="w-4 h-4 text-terracotta" />
                                    {addr.recipientName || user.name}
                                  </h3>
                                  {addr.isDefault && (
                                    <span className="text-[10px] bg-terracotta/10 text-terracotta px-2 py-0.5 rounded-full font-bold uppercase tracking-wide border border-terracotta/20">
                                      Padrão
                                    </span>
                                  )}
                                </div>
                                
                                <div className="pl-6 text-gray-600 text-sm space-y-1">
                                   <p>
                                     {addr.street}, {addr.number} {addr.complement && `• ${addr.complement}`}
                                   </p>
                                   <p>
                                     {addr.district}, {addr.city} - {addr.state}
                                   </p>
                                   <div className="flex items-center gap-4 mt-2 text-gray-500 text-xs font-medium">
                                      <span className="bg-gray-100 px-2 py-1 rounded">CEP: {addr.zipCode}</span>
                                      {addr.phone && <span className="bg-gray-100 px-2 py-1 rounded">Tel: {addr.phone}</span>}
                                   </div>
                                   {addr.referencePoint && (
                                      <p className="text-gray-400 text-xs mt-2 italic">Ref: {addr.referencePoint}</p>
                                   )}
                                </div>
                            </div>

                            <div className="flex items-center gap-2 md:self-start pl-6 md:pl-0 pt-2 md:pt-0 border-t md:border-t-0 border-gray-50 mt-2 md:mt-0">
                              <button 
                                onClick={() => openEditForm(addr)}
                                className="text-gray-400 hover:text-terracotta transition p-2 rounded-lg hover:bg-orange-50"
                                title="Editar endereço"
                              >
                                <Edit2 className="w-4 h-4" />
                              </button>
                              <div className="w-px h-4 bg-gray-200 hidden md:block"></div>
                              <button 
                                onClick={() => handleDeleteAddress(addr.id)}
                                className="text-gray-400 hover:text-red-500 transition p-2 rounded-lg hover:bg-red-50"
                                title="Excluir endereço"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </>
                )}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
