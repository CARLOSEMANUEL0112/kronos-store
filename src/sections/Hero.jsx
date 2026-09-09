import { useState, useEffect } from "react";
import { ArrowRight, Zap, Star, ChevronLeft, ChevronRight } from "lucide-react";

const heroSlides = [
  {
    url: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=1920",
    title: "Urban & Tech 2026",
    subtitle: "O futuro do seu estilo começa aqui.",
  },
  {
    url: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80&w=1920",
    title: "Alfaiataria Minimalista",
    subtitle: "Elegância e sofisticação em cada detalhe.",
  },
  {
    url: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&q=80&w=1920",
    title: "Coleção Exclusiva",
    subtitle: "Peças limitadas para quem dita tendências.",
  },
];

export default function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Passa o slide automaticamente a cada 6 segundos
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % heroSlides.length);
  const prevSlide = () => setCurrentIndex((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);

  return (
    <section className="relative min-h-[85vh] lg:min-h-[90vh] flex items-center justify-center bg-slate-950 text-white overflow-hidden">
      
      {/* Carrossel de Imagens no Fundo com Overlay Escuro */}
      {heroSlides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentIndex ? "opacity-100 z-0" : "opacity-0 -z-10"
          }`}
        >
          <img 
            src={slide.url} 
            alt={slide.title}
            className="w-full h-full object-cover object-center scale-105 animate-pulse duration-1000"
          />
          {/* Degradê escuro para destacar os textos em cima da foto */}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-slate-950/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/60" />
        </div>
      ))}

      {/* Conteúdo Central / Alinhado à Esquerda sobre o Fundo */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full py-20">
        <div className="max-w-2xl space-y-6">
          
          <div className="inline-flex items-center gap-2 bg-indigo-500/20 border border-indigo-500/40 px-3.5 py-1.5 rounded-full backdrop-blur-md">
            <Zap className="w-4 h-4 text-indigo-400" />
            <span className="text-xs font-semibold text-indigo-200">{heroSlides[currentIndex].title}</span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-none drop-shadow-lg">
            {heroSlides[currentIndex].subtitle}
          </h1>

          <p className="text-slate-300 text-base sm:text-lg max-w-xl font-normal drop-shadow">
            Descubra peças de alta performance, design minimalista e exclusividade para transformar o seu dia a dia.
          </p>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4">
            <a 
              href="#produtos" 
              className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-4 px-8 rounded-2xl shadow-xl shadow-indigo-600/40 flex items-center justify-center gap-2 transition-all transform hover:-translate-y-0.5"
            >
              Explorar Catálogo <ArrowRight className="w-5 h-5" />
            </a>
            <div className="flex items-center justify-center gap-3 px-4 py-3 bg-slate-900/80 border border-slate-800/80 rounded-2xl backdrop-blur-md">
              <div className="flex -space-x-2">
                <img className="w-8 h-8 rounded-full border-2 border-slate-900 object-cover" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200" alt="Cliente" />
                <img className="w-8 h-8 rounded-full border-2 border-slate-900 object-cover" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200" alt="Cliente" />
                <img className="w-8 h-8 rounded-full border-2 border-slate-900 object-cover" src="https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=200" alt="Cliente" />
              </div>
              <div className="text-left">
                <div className="flex items-center text-amber-400">
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <Star className="w-3.5 h-3.5 fill-current" />
                </div>
                <span className="text-[11px] text-slate-300 font-medium">+5.000 Clientes Satisfeitos</span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Setas de Navegação Laterais Discretas */}
      <button 
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-slate-950/40 hover:bg-slate-950/80 text-white p-3 rounded-full border border-white/10 backdrop-blur-md transition-all hidden sm:block"
        aria-label="Slide anterior"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <button 
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-slate-950/40 hover:bg-slate-950/80 text-white p-3 rounded-full border border-white/10 backdrop-blur-md transition-all hidden sm:block"
        aria-label="Próximo slide"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Indicadores Inferiores (Bolinhas/Barras) */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-2 rounded-full transition-all ${
              index === currentIndex ? "w-8 bg-indigo-500" : "w-2 bg-white/40 hover:bg-white/70"
            }`}
            aria-label={`Ir para slide ${index + 1}`}
          />
        ))}
      </div>

    </section>
  );
}