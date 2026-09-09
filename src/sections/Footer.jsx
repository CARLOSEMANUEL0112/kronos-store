import { ShoppingBag, MessageCircle, MapPin, Phone, ShieldCheck, Heart, Clock, ExternalLink } from "lucide-react";
import { site } from "../data/site";

export default function Footer() {
  const formatPhone = (phoneStr) => {
    const cleaned = phoneStr.replace(/\D/g, "");
    const num = cleaned.startsWith("55") ? cleaned.slice(2) : cleaned;
    if (num.length === 11) {
      return `(${num.slice(0, 2)}) ${num.slice(2, 7)}-${num.slice(7)}`;
    }
    return phoneStr;
  };

  return (
    <footer id="contato" className="bg-slate-950 text-slate-400 border-t border-slate-900 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          
          {/* Coluna 1: Sobre */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-indigo-600/30">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <span className="text-xl font-black tracking-wider text-white">{site.name}</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Moda urbana e alfaiataria de alta performance. Desenvolvido para quem dita o próprio ritmo com estilo, sofisticação e atitude.
            </p>
            <div className="pt-2">
              <a 
                href={`https://wa.me/${site.whatsapp}`} 
                target="_blank" 
                rel="noreferrer" 
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 text-white text-xs font-semibold hover:bg-emerald-500 transition-all shadow-sm"
              >
                <MessageCircle className="w-4 h-4" /> Falar no WhatsApp
              </a>
            </div>
          </div>

          {/* Coluna 2: Links Rápidos */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Navegação</h4>
            <ul className="space-y-2.5 text-xs">
              <li><a href="#" className="hover:text-indigo-400 transition-colors">Início</a></li>
              <li><a href="#produtos" className="hover:text-indigo-400 transition-colors">Catálogo de Produtos</a></li>
              <li><a href="#destaques" className="hover:text-indigo-400 transition-colors">Destaques da Temporada</a></li>
              <li><a href="#contato" className="hover:text-indigo-400 transition-colors">Central de Atendimento</a></li>
            </ul>
          </div>

          {/* Coluna 3: Atendimento & Endereço */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Contato & Endereço</h4>
            <ul className="space-y-3 text-xs">
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-indigo-400 shrink-0" />
                <a href={`https://wa.me/${site.whatsapp}`} target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
                  {formatPhone(site.whatsapp)}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                <div>
                  <p>{site.address}</p>
                  <p className="text-slate-500 text-[11px]">{site.city}</p>
                  {site.mapUrl && (
                    <a href={site.mapUrl} target="_blank" rel="noreferrer" className="text-indigo-400 hover:underline text-[11px] flex items-center gap-1 mt-1">
                      Abrir no Google Maps <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
              </li>
              <li className="flex items-start gap-2.5 pt-1">
                <Clock className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                <span>{site.hours}</span>
              </li>
            </ul>
          </div>

          {/* Coluna 4: Mapa Iframe & Segurança */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Nossa Localização</h4>
            <div className="w-full h-32 rounded-2xl overflow-hidden border border-slate-800 bg-slate-900 relative shadow-inner">
              <iframe
                title="Mapa de Localização"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3839.0559798050965!2d-48.1345!3d-15.8200!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sMTXCsDQ5JzEyLjAiUyA0OMKwMDgnMDQuMiJX!5e0!3m2!1spt-BR!2sbr!4v1620000000000!5m2!1spt-BR!2sbr"
                width="100%"
                height="100%"
                style={{ border: 0, filter: "invert(90%) hue-rotate(180deg)" }}
                allowFullScreen=""
                loading="lazy"
              ></iframe>
            </div>
            <div className="flex items-center gap-2 text-emerald-400 text-xs font-semibold bg-slate-900/60 border border-slate-800 p-3 rounded-xl">
              <ShieldCheck className="w-4 h-4 shrink-0" /> Criptografia SSL • Compra Segura
            </div>
          </div>

        </div>

        <div className="border-t border-slate-900 pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© 2026 {site.name}. Todos os direitos reservados.</p>
          <p className="flex items-center gap-1">
            Feito com <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" /> para o seu negócio.
          </p>
        </div>

      </div>
    </footer>
  );
}