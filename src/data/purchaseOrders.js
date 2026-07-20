// Bons de commande fictifs. status: 'attente' | 'prepare' | 'livre' | 'annule'
export const purchaseOrders = [
  {
    id: 'BC-2026-045', date: '2026-07-20', clientId: 'c2', status: 'attente', estimate: 2900000,
    items: [ { productId: 'p01', unit: 'Sac (50 kg)', qty: 20, price: 145000 } ],
  },
  {
    id: 'BC-2026-044', date: '2026-07-19', clientId: 'c6', status: 'prepare', estimate: 1560000,
    items: [ { productId: 'p12', unit: 'Carton (12)', qty: 20, price: 31200 }, { productId: 'p10', unit: 'Carton (600)', qty: 12, price: 72000 } ],
  },
  {
    id: 'BC-2026-043', date: '2026-07-18', clientId: 'c1', status: 'livre', estimate: 890000,
    items: [ { productId: 'p05', unit: 'Sac (25 kg)', qty: 8, price: 62500 }, { productId: 'p11', unit: 'Sac (25 kg)', qty: 14, price: 27500 } ],
  },
  {
    id: 'BC-2026-042', date: '2026-07-16', clientId: 'c4', status: 'annule', estimate: 640000,
    items: [ { productId: 'p13', unit: 'Carton (24)', qty: 2, price: 264000 } ],
  },
  {
    id: 'BC-2026-041', date: '2026-07-15', clientId: 'c8', status: 'livre', estimate: 456000,
    items: [ { productId: 'p06', unit: 'Carton (24 paquets)', qty: 12, price: 36000 } ],
  },
]

const poStatusMap = {
  attente: { label: 'En attente', tone: 'amber' },
  prepare: { label: 'Préparé', tone: 'blue' },
  livre: { label: 'Livré', tone: 'green' },
  annule: { label: 'Annulé', tone: 'red' },
}
export const poStatusInfo = (s) => poStatusMap[s] || { label: s, tone: 'gray' }
