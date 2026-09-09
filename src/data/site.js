// Configurações centrais do site
export const site = {
  name: "Kronos Store",
  shortName: "Kronos",
  city: "Brasília • DF",
  whatsapp: "5589981433161",
  instagram: "@carlos_emanuelrf",
  address: "Trecho 2, Quadra 123, Conjunto B • Sol Nascente",
  hours: "Seg a Sex, 9h às 19h • Sáb, 9h às 14h",
  mapUrl: "https://maps.app.goo.gl/MVf8esPkWuJESybj7",
  isDemo: true,
  stats: {
    clientCount: "+1.500",
    googleRating: "4.9",
    experienceYears: "8",
  },
}

export function whatsappUrl(message = "Olá! Gostaria de finalizar minha compra.") {
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`
}