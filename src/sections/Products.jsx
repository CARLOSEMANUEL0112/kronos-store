import { useState } from "react";
import { ShoppingBag, Check, Sparkles } from "lucide-react";

/* ---------- Dados dos produtos atualizados com a imagem correta para o Relógio ---------- */
const allProducts = [
  {
    id: 1,
    name: "Camiseta Minimalist Clean",
    category: "Masculino",
    price: "R$ 79,90",
    installments: "3x de R$ 26,63",
    discount: "10% OFF",
    sizes: ["P", "M", "G", "GG"],
    colors: [
      { 
        name: "Branco", 
        code: "bg-slate-100", 
        image: "https://images.pexels.com/photos/18257675/pexels-photo-18257675.jpeg" 
      },
      { 
        name: "Preto", 
        code: "bg-slate-950", 
        image: "https://images.pexels.com/photos/8532616/pexels-photo-8532616.jpeg" 
      }
    ],
  },
  {
    id: 2,
    name: "Calça Cargo Street Utility",
    category: "Masculino",
    price: "R$ 159,90",
    installments: "4x de R$ 39,97",
    discount: "15% OFF",
    sizes: ["38", "40", "42", "44"],
    colors: [
      { 
        name: "Verde", 
        code: "bg-emerald-800", 
        image: "https://images.pexels.com/photos/13125260/pexels-photo-13125260.jpeg" 
      },
      { 
        name: "Jeans", 
        code: "bg-blue-600", 
        image: "https://images.pexels.com/photos/35568704/pexels-photo-35568704.jpeg" 
      },
    ],
  },
  {
    id: 3,
    name: "Moletom Essential Black",
    category: "Masculino",
    price: "R$ 189,90",
    installments: "5x de R$ 37,98",
    discount: "Lançamento",
    sizes: ["P", "M", "G", "GG"],
    colors: [
      { 
        name: "Moletom Preto com Capuz", 
        code: "bg-slate-950", 
        image: "https://images.pexels.com/photos/28701965/pexels-photo-28701965.jpeg" 
      },
      { 
        name: "Moletom Branco", 
        code: "bg-slate-200", 
        image: "https://images.pexels.com/photos/32286459/pexels-photo-32286459.jpeg" 
      },
    ],
  },
  {
    id: 4,
    name: "Vestido Midi Ribbed Minimalist",
    category: "Feminino",
    price: "R$ 179,90",
    installments: "4x de R$ 44,97",
    discount: "20% OFF",
    sizes: ["PP", "P", "M", "G"],
    colors: [
      { 
        name: "Branco", 
        code: "bg-slate-100", 
        image: "https://images.pexels.com/photos/34921967/pexels-photo-34921967.jpeg" 
      },
      { 
        name: "Preto Sofisticado", 
        code: "bg-slate-900", 
        image: "https://images.pexels.com/photos/39000400/pexels-photo-39000400.jpeg" 
      },
    ],
  },
  {
    id: 5,
    name: "Conjunto Alfaiataria Urban Chic",
    category: "Feminino",
    price: "R$ 329,90",
    installments: "6x de R$ 54,98",
    discount: "Lançamento",
    sizes: ["P", "M", "G"],
    colors: [
      { 
        name: "Vermelho", 
        code: "bg-rose-600", 
        image: "https://images.pexels.com/photos/38008784/pexels-photo-38008784.jpeg" 
      },
      { 
        name: "Amarelo", 
        code: "bg-amber-400", 
        image: "https://images.pexels.com/photos/11588274/pexels-photo-11588274.jpeg" 
      },
    ],
  },
  {
    id: 6,
    name: "Tênis Urban Runner Pro",
    category: "Tênis",
    price: "R$ 399,90",
    installments: "6x de R$ 66,65",
    discount: "15% OFF",
    sizes: ["38", "39", "40", "41", "42"],
    colors: [
      { 
        name: "Vermelho", 
        code: "bg-red-600", 
        image: "https://images.pexels.com/photos/4490019/pexels-photo-4490019.jpeg" 
      },
      { 
        name: "Branco", 
        code: "bg-slate-100", 
        image: "https://images.pexels.com/photos/23491456/pexels-photo-23491456.jpeg" 
      },
    ],
  },
  {
    id: 7,
    name: "Relógio Kronos Chronos Black",
    category: "Relógios",
    price: "R$ 599,90",
    installments: "10x de R$ 59,99",
    discount: "10% OFF",
    sizes: ["Único"],
    image: "https://media.istockphoto.com/id/139975443/pt/foto/rel%C3%B3gio-sports-cron%C3%B3grafo.jpg?s=1024x1024&w=is&k=20&c=C-acLrMrG7G-2DbHoM7VMSUkYt1rifo9eMjz0Txxwy0=",
  },
  {
    id: 8,
    name: "Perfume Noir Intense Eau de Parfum",
    category: "Perfumes",
    price: "R$ 249,90",
    installments: "4x de R$ 62,47",
    discount: "Frete Grátis",
    sizes: ["100ml"],
    image: "https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&q=80&w=800",
  },
];

const categories = ["Todos", "Masculino", "Feminino", "Tênis", "Relógios", "Perfumes"];

export default function Products({ onAddToCart, searchQuery = "" }) {
  const [activeCategory, setActiveCategory] = useState("Todos");
  const [selectedSizes, setSelectedSizes] = useState({});
  const [selectedColors, setSelectedColors] = useState({});
  const [addedId, setAddedId] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);

  const filteredProducts = allProducts.filter((product) => {
    const matchesCategory = activeCategory === "Todos" || product.category === activeCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleSizeSelect = (productId, size) => {
    setSelectedSizes({ ...selectedSizes, [productId]: size });
  };

  const handleColorSelect = (productId, colorObj) => {
    setSelectedColors({ ...selectedColors, [productId]: colorObj });
  };

  const handleAdd = (product) => {
    const size = selectedSizes[product.id] || product.sizes[0];
    const currentColor = product.colors ? (selectedColors[product.id] || product.colors[0]) : null;
    const finalImage = currentColor ? currentColor.image : product.image;

    if (onAddToCart) {
      onAddToCart({
        ...product,
        selectedSize: size,
        selectedColor: currentColor ? currentColor.name : "Único",
        image: finalImage,
      });
    }

    setAddedId(product.id);
    const detailText = currentColor ? ` (${currentColor.name} - ${size})` : ` (${size})`;
    setToastMessage(`${product.name}${detailText} adicionado!`);

    setTimeout(() => setAddedId(null), 1500);
    setTimeout(() => setToastMessage(null), 3000);
  };

  return (
    <section id="produtos" className="py-24 bg-slate-950 text-white border-t border-slate-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div>
            <span className="text-indigo-400 text-xs font-bold uppercase tracking-wider flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" /> Catálogo Completo
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mt-1">Explore Nossos Departamentos</h2>
          </div>

          <div className="flex flex-wrap gap-2 bg-slate-900/60 p-1.5 rounded-2xl border border-slate-800">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                  activeCategory === cat
                    ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30"
                    : "text-slate-400 hover:text-white hover:bg-slate-800/50"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="text-center py-20 text-slate-400">
            <p className="text-lg">Nenhum produto encontrado para sua busca.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => {
              const currentSize = selectedSizes[product.id] || product.sizes[0];
              const currentColor = product.colors ? (selectedColors[product.id] || product.colors[0]) : null;
              const currentImage = currentColor ? currentColor.image : product.image;
              const isAdded = addedId === product.id;

              return (
                <div
                  key={product.id}
                  className="group bg-slate-900/40 border border-slate-800/80 rounded-2xl p-4 flex flex-col justify-between hover:border-indigo-500/50 transition-all duration-300 shadow-xl overflow-hidden"
                >
                  <div>
                    {/* Vitrine de Imagem */}
                    <div className="w-full h-60 rounded-xl mb-4 relative overflow-hidden bg-slate-950 flex items-center justify-center border border-slate-800/60">
                      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-950 via-slate-900 to-slate-950 pointer-events-none" />

                      <img
                        key={currentImage}
                        src={currentImage}
                        alt={product.name}
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-all duration-300 relative z-10"
                      />

                      {currentColor && (
                        <span className="absolute bottom-3 left-3 z-30 bg-slate-900/90 backdrop-blur-md text-[11px] font-medium px-3 py-1 rounded-full text-white border border-slate-700/60 shadow-lg flex items-center gap-1.5 transition-all">
                          <span className={`w-2 h-2 rounded-full ${currentColor.code}`} />
                          {currentColor.name}
                        </span>
                      )}

                      <span className="absolute top-3 right-3 z-30 bg-indigo-600/90 backdrop-blur-md text-[10px] font-bold px-2.5 py-1 rounded-full text-white shadow-md">
                        {product.discount}
                      </span>
                    </div>

                    <h3 className="font-bold text-base text-white group-hover:text-indigo-400 transition-colors line-clamp-1">
                      {product.name}
                    </h3>

                    {product.colors && (
                      <div className="mt-3">
                        <span className="text-xs text-slate-400 block mb-1">Cor / Estilo:</span>
                        <div className="flex items-center gap-2">
                          {product.colors.map((colorObj) => (
                            <button
                              key={colorObj.name}
                              onClick={() => handleColorSelect(product.id, colorObj)}
                              title={colorObj.name}
                              className={`w-6 h-6 rounded-full border ${colorObj.code} transition-all ${
                                currentColor?.name === colorObj.name
                                  ? "ring-2 ring-indigo-500 ring-offset-2 ring-offset-slate-950 scale-110"
                                  : "opacity-70 hover:opacity-100"
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="mt-3">
                      <span className="text-xs text-slate-400 block mb-1">Tamanho:</span>
                      <div className="flex flex-wrap gap-1.5">
                        {product.sizes.map((size) => (
                          <button
                            key={size}
                            onClick={() => handleSizeSelect(product.id, size)}
                            className={`px-2.5 py-1 rounded-lg text-xs font-semibold border transition-all ${
                              currentSize === size
                                ? "bg-indigo-600 border-indigo-500 text-white shadow-sm"
                                : "bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700"
                            }`}
                          >
                            {size}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-800/80">
                    <div className="flex items-baseline justify-between mb-3">
                      <span className="text-lg font-bold text-white">{product.price}</span>
                      <span className="text-[11px] text-slate-400">{product.installments}</span>
                    </div>

                    <button
                      onClick={() => handleAdd(product)}
                      className={`w-full py-2.5 px-4 rounded-xl font-medium text-xs flex items-center justify-center gap-2 transition-all ${
                        isAdded
                          ? "bg-emerald-600 text-white"
                          : "bg-indigo-600 hover:bg-indigo-500 text-white shadow-md shadow-indigo-600/25"
                      }`}
                    >
                      {isAdded ? (
                        <>
                          <Check className="w-4 h-4" /> Adicionado!
                        </>
                      ) : (
                        <>
                          <ShoppingBag className="w-4 h-4" /> Comprar Agora
                        </>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 border border-indigo-500/50 text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-3 animate-bounce">
          <div className="w-6 h-6 rounded-full bg-indigo-600 flex items-center justify-center text-white">
            <Check className="w-3.5 h-3.5" />
          </div>
          <span className="text-xs font-medium">{toastMessage}</span>
        </div>
      )}
    </section>
  );
}