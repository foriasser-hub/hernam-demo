// Séries pour les graphiques du tableau de bord (fictives).

// Évolution des ventes sur 7 jours (en Ariary)
export const salesTrend = [
  { jour: 'Lun', ventes: 3850000, especes: 2100000 },
  { jour: 'Mar', ventes: 4200000, especes: 2400000 },
  { jour: 'Mer', ventes: 3100000, especes: 1800000 },
  { jour: 'Jeu', ventes: 5400000, especes: 2900000 },
  { jour: 'Ven', ventes: 6100000, especes: 3300000 },
  { jour: 'Sam', ventes: 7250000, especes: 4100000 },
  { jour: 'Dim', ventes: 2400000, especes: 1500000 },
]

// Produits les plus vendus (part du CA du mois)
export const topProducts = [
  { name: 'Riz Makalioka', value: 42, montant: 18600000 },
  { name: 'Huile végétale', value: 18, montant: 7980000 },
  { name: 'Sucre roux', value: 12, montant: 5320000 },
  { name: 'Boisson THB', value: 9, montant: 3990000 },
  { name: 'Cube Jumbo', value: 7, montant: 3100000 },
  { name: 'Autres', value: 12, montant: 5320000 },
]

// Chiffre d'affaires mensuel (6 derniers mois)
export const monthlyRevenue = [
  { mois: 'Fév', ca: 68000000 },
  { mois: 'Mar', ca: 72500000 },
  { mois: 'Avr', ca: 66200000 },
  { mois: 'Mai', ca: 81400000 },
  { mois: 'Juin', ca: 88900000 },
  { mois: 'Juil', ca: 94300000 },
]

// Couleurs graphiques (cohérentes avec la charte)
export const chartColors = ['#0f924f', '#40cd7f', '#f59e0b', '#3b82f6', '#8b5cf6', '#94a3b8']
