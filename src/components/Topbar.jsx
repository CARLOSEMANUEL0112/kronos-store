import { Sparkles, Truck } from "lucide-react";

export default function Topbar() {
  return (
    <div className="bg-indigo-600 text-white text-xs py-2 px-4">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2 font-medium">
        <div className="flex items-center gap-2">
          <Sparkles className="w-3.5 h-3.5 animate-pulse" />
          <span>Frete Grátis para todo o Brasil nas compras acima de R$ 399</span>
        </div>
        <div className="flex items-center gap-6">
          <span className="hidden md:flex items-center gap-1.5">
            <Truck className="w-3.5 h-3.5" /> Envio Rápido e Rastreado
          </span>
          <span className="flex items-center gap-1.5 font-bold underline">
            Ganhe 10% OFF no PIX
          </span>
        </div>
      </div>
    </div>
  );
}