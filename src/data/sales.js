// 10 ventes fictives. payment: 'especes' | 'mobile' | 'credit' | 'partiel'
export const sales = [
  {
    id: 'FAC-2026-0210', date: '2026-07-20T08:34:00', clientId: 'c2', seller: 'Naina RASOA', depot: 'A',
    payment: 'mobile', total: 1740000, paid: 1740000, discount: 0,
    items: [ { productId: 'p01', unit: 'Sac (50 kg)', qty: 12, price: 145000 } ],
  },
  {
    id: 'FAC-2026-0209', date: '2026-07-20T09:12:00', clientId: 'comptant', seller: 'Naina RASOA', depot: 'A',
    payment: 'especes', total: 96000, paid: 96000, discount: 0,
    items: [ { productId: 'p04', unit: 'Litre', qty: 6, price: 10500 }, { productId: 'p08', unit: 'Pièce', qty: 16, price: 2000 } ],
  },
  {
    id: 'FAC-2026-0208', date: '2026-07-20T10:05:00', clientId: 'c6', seller: 'Mamy RAKOTO', depot: 'B',
    payment: 'credit', total: 3120000, paid: 0, discount: 120000,
    items: [ { productId: 'p12', unit: 'Carton (12)', qty: 40, price: 31200 } ],
  },
  {
    id: 'FAC-2026-0207', date: '2026-07-19T14:48:00', clientId: 'c1', seller: 'Naina RASOA', depot: 'A',
    payment: 'partiel', total: 890000, paid: 500000, discount: 0,
    items: [ { productId: 'p05', unit: 'Sac (25 kg)', qty: 8, price: 62500 }, { productId: 'p11', unit: 'Sac (25 kg)', qty: 14, price: 27500 } ],
  },
  {
    id: 'FAC-2026-0206', date: '2026-07-19T11:20:00', clientId: 'c3', seller: 'Mamy RAKOTO', depot: 'B',
    payment: 'especes', total: 288000, paid: 288000, discount: 0,
    items: [ { productId: 'p06', unit: 'Carton (24 paquets)', qty: 8, price: 36000 } ],
  },
  {
    id: 'FAC-2026-0205', date: '2026-07-19T16:02:00', clientId: 'comptant', seller: 'Naina RASOA', depot: 'A',
    payment: 'especes', total: 45000, paid: 45000, discount: 0,
    items: [ { productId: 'p07', unit: 'Paquet (50)', qty: 15, price: 3000 } ],
  },
  {
    id: 'FAC-2026-0204', date: '2026-07-18T09:40:00', clientId: 'c8', seller: 'Mamy RAKOTO', depot: 'B',
    payment: 'mobile', total: 640000, paid: 640000, discount: 20000,
    items: [ { productId: 'p13', unit: 'Carton (24)', qty: 2, price: 264000 }, { productId: 'p14', unit: 'Carton (40)', qty: 1, price: 152000 } ],
  },
  {
    id: 'FAC-2026-0203', date: '2026-07-18T15:14:00', clientId: 'c4', seller: 'Naina RASOA', depot: 'A',
    payment: 'credit', total: 2100000, paid: 0, discount: 0,
    items: [ { productId: 'p01', unit: 'Sac (50 kg)', qty: 10, price: 145000 }, { productId: 'p04', unit: 'Bidon (20 L)', qty: 3, price: 190000 } ],
  },
  {
    id: 'FAC-2026-0202', date: '2026-07-17T10:28:00', clientId: 'c5', seller: 'Mamy RAKOTO', depot: 'B',
    payment: 'especes', total: 380000, paid: 380000, discount: 0,
    items: [ { productId: 'p15', unit: 'Carton (50)', qty: 2, price: 140000 }, { productId: 'p16', unit: 'Carton (50)', qty: 2, price: 40000 } ],
  },
  {
    id: 'FAC-2026-0201', date: '2026-07-17T17:05:00', clientId: 'c2', seller: 'Naina RASOA', depot: 'A',
    payment: 'mobile', total: 1450000, paid: 1450000, discount: 50000,
    items: [ { productId: 'p10', unit: 'Carton (600)', qty: 20, price: 72000 } ],
  },
]

const paymentMap = {
  especes: { label: 'Espèces', tone: 'green' },
  mobile: { label: 'Mobile Money', tone: 'blue' },
  credit: { label: 'Crédit', tone: 'red' },
  partiel: { label: 'Paiement partiel', tone: 'amber' },
}
export const paymentInfo = (p) => paymentMap[p] || { label: p, tone: 'gray' }
