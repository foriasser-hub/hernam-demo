// 8 clients fictifs. type: 'Grossiste' | 'Détaillant' | 'Particulier'
export const clients = [
  { id: 'c1', name: 'Épicerie Rakoto', phone: '+261 34 10 200 30', type: 'Détaillant', totalPurchases: 18400000, debt: 1250000, lastSale: '2026-07-19', allowedDiscount: 5, status: 'a_jour' },
  { id: 'c2', name: 'Grossiste Andria', phone: '+261 32 45 780 11', type: 'Grossiste', totalPurchases: 62800000, debt: 4800000, lastSale: '2026-07-20', allowedDiscount: 8, status: 'a_jour' },
  { id: 'c3', name: 'Boutique Hasina', phone: '+261 33 22 145 67', type: 'Détaillant', totalPurchases: 9600000, debt: 0, lastSale: '2026-07-18', allowedDiscount: 3, status: 'a_jour' },
  { id: 'c4', name: 'Superette Voahangy', phone: '+261 34 66 900 22', type: 'Détaillant', totalPurchases: 24500000, debt: 2100000, lastSale: '2026-07-15', allowedDiscount: 5, status: 'retard' },
  { id: 'c5', name: 'Restaurant Chez Lova', phone: '+261 32 78 341 09', type: 'Particulier', totalPurchases: 5400000, debt: 380000, lastSale: '2026-07-17', allowedDiscount: 0, status: 'a_jour' },
  { id: 'c6', name: 'Marché Anosibe – Jaona', phone: '+261 33 11 908 45', type: 'Grossiste', totalPurchases: 41200000, debt: 6300000, lastSale: '2026-07-20', allowedDiscount: 7, status: 'retard' },
  { id: 'c7', name: 'Gargote Mirana', phone: '+261 34 87 220 16', type: 'Particulier', totalPurchases: 3100000, debt: 0, lastSale: '2026-07-16', allowedDiscount: 0, status: 'a_jour' },
  { id: 'c8', name: 'Épi-Service Tsiry', phone: '+261 32 40 655 78', type: 'Détaillant', totalPurchases: 15900000, debt: 920000, lastSale: '2026-07-14', allowedDiscount: 4, status: 'a_jour' },
]

export const clientById = (id) => clients.find((c) => c.id === id)
export const clientName = (id) => (id === 'comptant' ? 'Client comptant' : clientById(id)?.name || '—')
