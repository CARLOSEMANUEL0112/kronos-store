import { useState } from "react";
import Header from "./components/Header";
import Topbar from "./components/Topbar";
import Hero from "./sections/Hero";
import Brands from "./sections/Brands";
import Products from "./sections/Products";
import Highlights from "./sections/Highlights";
import Footer from "./sections/Footer";
import { site, whatsappUrl } from "./data/site";
import { ShoppingBag, X, Plus, Minus, Trash2, Truck, MessageCircle } from "lucide-react";
import './App.css';

export default function App() {
  const [cartOpen, setCartOpen] = useState(false);
  const [cart, setCart] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const parsePrice = (priceStr) => {
    if (typeof priceStr === "number") return priceStr;
    if (!priceStr) return 0;
    const clean = priceStr.replace("R$", "").replace(/\s/g, "").replace(".", "").replace(",", ".");
    return parseFloat(clean) || 0;
  };

  const handleAddToCart = (productWithSelectedSize) => {
    const numericPrice = parsePrice(productWithSelectedSize.price);
    
    setCart((prev) => {
      const existingItem = prev.find(
        (item) => item.id === productWithSelectedSize.id && item.selectedSize === productWithSelectedSize.selectedSize
      );
      if (existingItem) {
        return prev.map((item) =>
          item.id === productWithSelectedSize.id && item.selectedSize === productWithSelectedSize.selectedSize
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...productWithSelectedSize, numericPrice, quantity: 1 }];
    });
    setCartOpen(true);
  };

  const updateQuantity = (id, selectedSize, delta) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.id === id && item.selectedSize === selectedSize) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  const removeFromCart = (id, selectedSize) => {
    setCart((prev) => prev.filter((item) => !(item.id === id && item.selectedSize === selectedSize)));
  };

  const subtotal = cart.reduce((acc, item) => acc + item.numericPrice * item.quantity, 0);
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
  const freeShippingThreshold = 399;
  const progress = Math.min((subtotal / freeShippingThreshold) * 100, 100);

  const handleWhatsAppCheckout = () => {
    if (cart.length === 0) return;
    
    let message = `🛍️ *Novo Pedido - ${site.name}*\n\n`;
    cart.forEach((item, index) => {
      message += `${index + 1}. *${item.name}*\n`;
      message += `   - Tamanho/Opção: ${item.selectedSize}\n`;
      message += `   - Qtd: ${item.quantity}x\n`;
      message += `   - Preço: R$ ${(item.numericPrice * item.quantity).toFixed(2).replace(".", ",")}\n\n`;
    });

    message += `💰 *Subtotal:* R$ ${subtotal.toFixed(2).replace(".", ",")}\n`;
    if (subtotal >= freeShippingThreshold) {
      message += `🚚 *Frete:* Grátis conquistado! 🎉\n`;
    } else {
      message += `🚚 *Frete:* A calcular\n`;
    }
    message += `\n*Total a Pagar:* R$ ${subtotal.toFixed(2).replace(".", ",")}\n\n`;
    message += `Olá! Gostaria de finalizar este pedido.`;

    const url = whatsappUrl(message);
    window.open(url, "_blank");
  };

  return (
    <div className="bg-slate-950 min-h-screen text-slate-100 font-sans selection:bg-indigo-500 selection:text-white">
      <Topbar />
      
      <Header 
        cartCount={totalItems} 
        onOpenCart={() => setCartOpen(true)}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />

      <main>
        <Hero />
        <Brands />
        <Products 
          onAddToCart={handleAddToCart} 
          searchQuery={searchTerm}
        />
        <Highlights 
          onAddToCart={handleAddToCart} 
        />
      </main>

      <Footer />

      {cartOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex justify-end">
          <div className="w-full max-w-md bg-slate-900 border-l border-slate-800 h-full flex flex-col shadow-2xl">
            
            <div className="p-6 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-indigo-400" />
                <h3 className="text-lg font-bold text-white">Sua Sacola ({totalItems})</h3>
              </div>
              <button 
                onClick={() => setCartOpen(false)} 
                className="text-slate-400 hover:text-white p-1.5 rounded-xl bg-slate-800/50 transition-all"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="bg-slate-950/60 p-4 border-b border-slate-800/60">
              <div className="flex justify-between text-xs font-medium mb-1.5">
                <span className="text-slate-300">
                  {subtotal >= freeShippingThreshold ? (
                    <span className="text-emerald-400 font-bold flex items-center gap-1">
                      <Truck className="w-4 h-4" /> Frete Grátis Conquistado!
                    </span>
                  ) : (
                    `Faltam R$ ${(freeShippingThreshold - subtotal).toFixed(2).replace(".", ",")} para Frete Grátis`
                  )}
                </span>
              </div>
              <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                <div className="bg-indigo-500 h-full transition-all duration-500" style={{ width: `${progress}%` }} />
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {cart.length === 0 ? (
                <div className="text-center py-20 space-y-4">
                  <div className="w-16 h-16 bg-slate-800/80 rounded-full flex items-center justify-center mx-auto text-slate-500">
                    <ShoppingBag className="w-8 h-8" />
                  </div>
                  <p className="text-slate-400 text-sm">Sua sacola está vazia.</p>
                </div>
              ) : (
                cart.map((item, idx) => (
                  <div key={`${item.id}-${item.selectedSize}-${idx}`} className="flex gap-4 bg-slate-950/40 border border-slate-800/60 p-3 rounded-2xl items-center">
                    <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-xl bg-slate-800 shrink-0" />
                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs font-bold text-white truncate">{item.name}</h4>
                      <span className="text-[11px] text-slate-400">Opção: <strong className="text-indigo-400">{item.selectedSize}</strong></span>
                      <div className="text-xs font-black text-indigo-400 mt-1">
                        R$ {(item.numericPrice * item.quantity).toFixed(2).replace(".", ",")}
                      </div>
                    </div>
                    <div className="flex flex-col items-end justify-between h-full gap-3">
                      <button 
                        onClick={() => removeFromCart(item.id, item.selectedSize)} 
                        className="text-slate-500 hover:text-red-400 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                      <div className="flex items-center gap-2 bg-slate-800/80 rounded-lg px-2 py-0.5">
                        <button onClick={() => updateQuantity(item.id, item.selectedSize, -1)} className="text-slate-400 hover:text-white"><Minus className="w-3 h-3" /></button>
                        <span className="text-xs font-bold text-white w-4 text-center">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, item.selectedSize, 1)} className="text-slate-400 hover:text-white"><Plus className="w-3 h-3" /></button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {cart.length > 0 && (
              <div className="p-6 border-t border-slate-800 bg-slate-950/80 space-y-4">
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between text-slate-400">
                    <span>Subtotal</span>
                    <span>R$ {subtotal.toFixed(2).replace(".", ",")}</span>
                  </div>
                  <div className="flex justify-between text-base font-black text-white pt-2 border-t border-slate-800">
                    <span>Total</span>
                    <span className="text-indigo-400">R$ {subtotal.toFixed(2).replace(".", ",")}</span>
                  </div>
                </div>
                <button 
                  onClick={handleWhatsAppCheckout}
                  className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3.5 rounded-2xl shadow-xl shadow-emerald-600/30 transition-all flex items-center justify-center gap-2 text-sm"
                >
                  <MessageCircle className="w-5 h-5" /> Finalizar Pedido no WhatsApp
                </button>
              </div>
            )}

          </div>
        </div>
      )}
    </div>
  );
}