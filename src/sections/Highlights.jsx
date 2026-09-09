import { Sparkles, Star, ArrowRight } from "lucide-react";

export default function Highlights({ onAddToCart }) {
  // Produtos em destaque atualizados com as imagens corretas
  const highlightedProducts = [
    {
      id: 6,
      name: "Tênis Urban Runner Pro",
      category: "Tênis",
      price: "R$ 399,90",
      installments: "6x de R$ 66,65",
      discount: "15% OFF",
      sizes: ["38", "39", "40", "41", "42"],
      image: "https://images.pexels.com/photos/4490019/pexels-photo-4490019.jpeg",
      selectedSize: "40"
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
      selectedSize: "Único"
    }
  ];

  return (
    <section id="destaques" className="py-24 bg-slate-950 text-white border-t border-slate-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <span className="text-amber-400 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" /> Coleção Exclusiva
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mt-1">Destaques da Temporada</h2>
          </div>
          <p className="text-slate-400 text-sm max-w-md">
            As peças mais desejadas e de alta performance escolhidas a dedo para elevar o seu estilo urbano.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {highlightedProducts.map((item) => (
            <div key={item.id} className="relative group bg-slate-900/60 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl flex flex-col sm:flex-row items-center">
              <div className="w-full sm:w-1/2 h-72 sm:h-full relative overflow-hidden bg-slate-950">
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 sm:bg-gradient-to-r sm:from-transparent sm:to-slate-950/40" />
                <span className="absolute top-4 left-4 bg-amber-500 text-slate-950 text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider shadow-lg">
                  {item.discount}
                </span>
              </div>

              <div className="w-full sm:w-1/2 p-6 sm:p-8 flex flex-col justify-between space-y-6">
                <div>
                  <span className="text-xs font-semibold text-indigo-400 uppercase tracking-widest">{item.category}</span>
                  <h3 className="text-2xl font-black text-white mt-1 group-hover:text-indigo-400 transition-colors">{item.name}</h3>
                  <div className="flex items-center gap-1 text-amber-400 my-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                    <span className="text-xs text-slate-400 ml-2">(4.9)</span>
                  </div>
                  <div className="mt-3">
                    <span className="text-2xl font-black text-white">{item.price}</span>
                    <span className="block text-xs text-slate-400 mt-0.5">{item.installments}</span>
                  </div>
                </div>

                <button
                  onClick={() => onAddToCart(item)}
                  className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3 px-5 rounded-2xl shadow-lg shadow-indigo-600/30 transition-all flex items-center justify-center gap-2 text-sm"
                >
                  Adicionar à Sacola <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}