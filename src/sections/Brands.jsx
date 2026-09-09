import { ShieldCheck, Award, TrendingUp, Star, Crown } from "lucide-react";

const brands = [
  { name: "KRONOS PRIME", icon: Crown },
  { name: "URBANTECH", icon: TrendingUp },
  { name: "NOIR COLLECTION", icon: Star },
  { name: "STREETLUX", icon: Award },
  { name: "GOLDEN ESSENCE", icon: ShieldCheck },
  // Duplicamos os itens para garantir o efeito contínuo sem falhas na animação
  { name: "KRONOS PRIME", icon: Crown },
  { name: "URBANTECH", icon: TrendingUp },
  { name: "NOIR COLLECTION", icon: Star },
  { name: "STREETLUX", icon: Award },
  { name: "GOLDEN ESSENCE", icon: ShieldCheck },
];

export default function Brands() {
  return (
    <section className="py-12 bg-slate-950 border-y border-slate-900/80 overflow-hidden relative">
      
      {/* Efeito de degradê nas bordas laterais para suavizar a entrada/saída */}
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-slate-950 to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-slate-950 to-transparent z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
        <p className="text-center text-xs font-semibold uppercase tracking-widest text-slate-500">
          Trabalhamos com curadoria e marcas de excelência global
        </p>
      </div>

      {/* Container do Carrossel Animado */}
      <div className="flex w-full overflow-hidden">
        <div className="flex gap-16 animate-marquee whitespace-nowrap items-center min-w-max py-2">
          {brands.map((brand, idx) => {
            const Icon = brand.icon;
            return (
              <div 
                key={idx} 
                className="flex items-center gap-3 text-slate-400 hover:text-indigo-400 transition-colors duration-300 cursor-default px-4"
              >
                <Icon className="w-5 h-5 text-indigo-500/80" />
                <span className="font-bold tracking-widest text-sm sm:text-base">{brand.name}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Adicionando a animação personalizada via tag style integrada */}
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 25s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}