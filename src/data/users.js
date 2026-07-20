// 3 utilisateurs fictifs : 1 administrateur + 2 vendeurs
export const users = [
  { id: 'u1', name: 'Herizo RANDRIA', role: 'admin', phone: '+261 34 12 345 67', depot: 'Tous', lastLogin: '2026-07-20T07:42:00', active: true },
  { id: 'u2', name: 'Naina RASOA', role: 'vendeur', phone: '+261 32 55 210 88', depot: 'Dépôt A', lastLogin: '2026-07-20T08:05:00', active: true },
  { id: 'u3', name: 'Mamy RAKOTO', role: 'vendeur', phone: '+261 33 77 902 41', depot: 'Dépôt B', lastLogin: '2026-07-19T16:20:00', active: true },
]

export const roleLabel = (role) => (role === 'admin' ? 'Administrateur' : 'Vendeur')
