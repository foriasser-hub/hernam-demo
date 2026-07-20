// 8 transferts fictifs entre dépôts. status: 'valide' | 'en_cours'
export const transfers = [
  { id: 't1', date: '2026-07-20T09:00:00', productId: 'p03', from: 'B', to: 'A', qty: 30, unit: 'Kg', reason: 'Rupture sucre au Dépôt A', responsible: 'Herizo RANDRIA', status: 'en_cours' },
  { id: 't2', date: '2026-07-19T15:30:00', productId: 'p01', from: 'B', to: 'A', qty: 10, unit: 'Sac (50 kg)', reason: 'Réapprovisionnement magasin', responsible: 'Herizo RANDRIA', status: 'valide' },
  { id: 't3', date: '2026-07-18T11:10:00', productId: 'p04', from: 'B', to: 'A', qty: 5, unit: 'Bidon (20 L)', reason: 'Demande vendeur A', responsible: 'Naina RASOA', status: 'valide' },
  { id: 't4', date: '2026-07-17T08:45:00', productId: 'p12', from: 'A', to: 'B', qty: 8, unit: 'Carton (12)', reason: 'Surstock boissons Dépôt A', responsible: 'Mamy RAKOTO', status: 'valide' },
  { id: 't5', date: '2026-07-16T14:00:00', productId: 'p08', from: 'B', to: 'A', qty: 4, unit: 'Carton (48)', reason: 'Réassort savon', responsible: 'Herizo RANDRIA', status: 'valide' },
  { id: 't6', date: '2026-07-15T10:20:00', productId: 'p06', from: 'A', to: 'B', qty: 6, unit: 'Carton (24 paquets)', reason: 'Équilibrage stock biscuits', responsible: 'Herizo RANDRIA', status: 'valide' },
  { id: 't7', date: '2026-07-14T16:40:00', productId: 'p10', from: 'B', to: 'A', qty: 5, unit: 'Carton (600)', reason: 'Demande client grossiste', responsible: 'Naina RASOA', status: 'valide' },
  { id: 't8', date: '2026-07-13T09:15:00', productId: 'p05', from: 'B', to: 'A', qty: 12, unit: 'Sac (25 kg)', reason: 'Réapprovisionnement farine', responsible: 'Herizo RANDRIA', status: 'valide' },
]
