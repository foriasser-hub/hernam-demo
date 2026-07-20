// Indicateurs clés du tableau de bord (valeurs fictives, en Ariary).
// sensitive = true → masqué en rôle Vendeur.
export const kpis = [
  { key: 'caJour', label: "Chiffre d'affaires du jour", value: 4956000, delta: +12, icon: 'Wallet', tone: 'brand' },
  { key: 'ventesSemaine', label: 'Ventes de la semaine', value: 32300000, delta: +8, icon: 'CalendarDays', tone: 'blue' },
  { key: 'ventesMois', label: 'Ventes du mois', value: 94300000, delta: +6, icon: 'TrendingUp', tone: 'indigo' },
  { key: 'benefice', label: 'Bénéfice estimé', value: 14180000, delta: +9, icon: 'PiggyBank', tone: 'emerald', sensitive: true },
  { key: 'depenses', label: 'Dépenses du mois', value: 6870000, delta: -3, icon: 'Receipt', tone: 'rose', sensitive: true },
  { key: 'stock', label: 'Valeur du stock', value: 218400000, delta: +2, icon: 'Boxes', tone: 'amber' },
  { key: 'detteClients', label: 'Dettes clients', value: 15750000, delta: +4, icon: 'HandCoins', tone: 'orange' },
  { key: 'detteFourn', label: 'Dettes fournisseurs', value: 73300000, delta: 0, icon: 'Truck', tone: 'slate', sensitive: true },
  { key: 'capital', label: 'Capital propre', value: 152600000, delta: +5, icon: 'Landmark', tone: 'brand', sensitive: true },
  { key: 'fournNonPayees', label: 'Marchandises fournisseurs non payées', value: 61300000, delta: 0, icon: 'PackageX', tone: 'red', sensitive: true },
]
