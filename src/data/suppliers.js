// 6 fournisseurs fictifs
export const suppliers = [
  { id: 'f1', name: 'SOMADA Import', phone: '+261 34 45 678 90', products: 'Riz, sucre, farine, sel', totalPurchases: 128500000, totalPaid: 96000000, nextDue: '2026-07-23' },
  { id: 'f2', name: 'Huilerie de Madagascar', phone: '+261 32 11 223 44', products: 'Huile végétale', totalPurchases: 54200000, totalPaid: 54200000, nextDue: null },
  { id: 'f3', name: 'Biscuiterie JB', phone: '+261 33 78 900 12', products: 'Biscuits, pâtes, bonbons', totalPurchases: 31800000, totalPaid: 21000000, nextDue: '2026-07-28' },
  { id: 'f4', name: 'Savonnerie Tropic', phone: '+261 34 22 556 78', products: 'Savon, hygiène', totalPurchases: 18400000, totalPaid: 15400000, nextDue: '2026-08-05' },
  { id: 'f5', name: 'STAR Distribution', phone: '+261 32 65 432 10', products: 'Boissons, Jumbo, divers', totalPurchases: 42600000, totalPaid: 30600000, nextDue: '2026-07-22' },
  { id: 'f6', name: 'Import Alim Océan', phone: '+261 33 90 812 34', products: 'Lait, café, conserves', totalPurchases: 67300000, totalPaid: 52300000, nextDue: '2026-07-25' },
]

export const supplierById = (id) => suppliers.find((s) => s.id === id)
export const supplierName = (id) => supplierById(id)?.name || '—'
