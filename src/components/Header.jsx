import { useState } from "react";
import { Search, ShoppingBag, X } from "lucide-react";

export default function Header({ cartCount, onOpenCart, searchTerm, setSearchTerm, searchResults, onSelectProduct }) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-slate-950/90 border-b border-slate-800 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Logo */}
        <a href="#" className="text-xl font-black tracking-wider text-white">
          KRONOS <span className="text-indigo-500">STORE</span>
        </a>

        {/* Links de Navegação */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
          <a href="#" className="hover:text-indigo-400 transition-colors">Início</a>
          <a href="#produtos" className="hover:text-indigo-400 transition-colors">Produtos</a>
          <a href="#destaques" className="hover:text-indigo-400 transition-colors">Destaques</a>
          <a href="#contato" className="hover:text-indigo-400 transition-colors">Contato</a>
        </nav>

        {/* Ações: Busca e Carrinho */}
        <div className="flex items-center gap-4 relative">
          
          {/* Campo de Busca em Tempo Real */}
          <div className="relative">
            {isSearchOpen ? (
              <div className="flex items-center bg-slate-900 border border-indigo-500/50 rounded-full px-3.5 py-1.5 shadow-lg w-64 sm:w-80">
                <Search className="w-4 h-4 text-indigo-400 mr-2 shrink-0" />
                <input
                  type="text"
                  placeholder="Buscar produtos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  autoFocus
                  className="bg-transparent text-sm text-white focus:outline-none w-full"
                />
                <button 
                  onClick={() => { setIsSearchOpen(false); setSearchTerm(""); }}
                  className="text-slate-400 hover:text-white ml-1"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button 
                onClick={() => setIsSearchOpen(true)}
                className="p-2.5 rounded-full bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 transition-all"
                aria-label="Abrir busca"
              >
                <Search className="w-5 h-5" />
              </button>
            )}

            {/* Resultados da Busca Flutuantes */}
            {isSearchOpen && searchTerm.trim() !== "" && (
              <div className="absolute right-0 mt-2 w-80 bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden z-50 max-h-96 overflow-y-auto">
                {searchResults.length > 0 ? (
                  searchResults.map((product) => (
                    <div
                      key={product.id}
                      onClick={() => {
                        onSelectProduct(product);
                        setIsSearchOpen(false);
                        setSearchTerm("");
                      }}
                      className="flex items-center gap-3 p-3 hover:bg-slate-800/80 cursor-pointer border-b border-slate-800/50 transition-colors"
                    >
                      <img src={product.image} alt={product.name} className="w-12 h-12 object-cover rounded-xl bg-slate-950" />
                      <div>
                        <h4 className="text-xs font-bold text-white line-clamp-1">{product.name}</h4>
                        <span className="text-xs font-black text-indigo-400">R$ {product.price.toFixed(2)}</span>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-4 text-center text-xs text-slate-400">
                    Nenhum produto encontrado para "{searchTerm}"
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Botão do Carrinho com Badge */}
          <button
            onClick={onOpenCart}
            className="relative p-2.5 rounded-full bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 transition-all"
            aria-label="Abrir carrinho"
          >
            <ShoppingBag className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-indigo-600 text-white text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center border-2 border-slate-950 shadow-md">
                {cartCount}
              </span>
            )}
          </button>

        </div>

      </div>
    </header>
  );
}