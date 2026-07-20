import {
  LayoutDashboard, ShoppingCart, History, FileText, ClipboardList,
  Boxes, Warehouse, ArrowLeftRight, PackagePlus,
  Users, HandCoins, Truck, ReceiptText,
  Receipt, Wallet, BarChart3, Sparkles,
  UserCog, ScrollText, Settings,
} from 'lucide-react'

// Structure de navigation. adminOnly = masqué pour le rôle Vendeur.
export const navGroups = [
  {
    label: 'Principal',
    items: [{ id: 'dashboard', page: 'dashboard', label: 'Tableau de bord', icon: LayoutDashboard }],
  },
  {
    label: 'Ventes',
    items: [
      { id: 'new-sale', page: 'new-sale', label: 'Nouvelle vente', icon: ShoppingCart },
      { id: 'sales-history', page: 'sales-history', label: 'Historique des ventes', icon: History },
      { id: 'invoices', page: 'invoices', label: 'Factures', icon: FileText, subPages: ['invoice'] },
      { id: 'purchase-orders', page: 'purchase-orders', label: 'Bons de commande', icon: ClipboardList },
    ],
  },
  {
    label: 'Stock',
    items: [
      { id: 'stock', page: 'stock', label: 'Stock', icon: Boxes },
      { id: 'depotA', page: 'depot', params: { depot: 'A' }, label: 'Dépôt A', icon: Warehouse },
      { id: 'depotB', page: 'depot', params: { depot: 'B' }, label: 'Dépôt B', icon: Warehouse },
      { id: 'transfers', page: 'transfers', label: 'Transferts', icon: ArrowLeftRight, adminOnly: true },
      { id: 'stock-entries', page: 'stock-entries', label: 'Entrées de stock', icon: PackagePlus, adminOnly: true },
    ],
  },
  {
    label: 'Partenaires',
    items: [
      { id: 'clients', page: 'clients', label: 'Clients', icon: Users, subPages: ['client'] },
      { id: 'client-debts', page: 'client-debts', label: 'Dettes clients', icon: HandCoins },
      { id: 'suppliers', page: 'suppliers', label: 'Fournisseurs', icon: Truck, adminOnly: true },
      { id: 'supplier-debts', page: 'supplier-debts', label: 'Dettes fournisseurs', icon: ReceiptText, adminOnly: true },
    ],
  },
  {
    label: 'Finances',
    items: [
      { id: 'expenses', page: 'expenses', label: 'Dépenses', icon: Receipt, adminOnly: true },
      { id: 'cash', page: 'cash', label: 'Caisse', icon: Wallet, adminOnly: true },
    ],
  },
  {
    label: 'Analyse',
    items: [
      { id: 'reports', page: 'reports', label: 'Rapports', icon: BarChart3 },
      { id: 'ai', page: 'ai', label: 'Conseiller IA', icon: Sparkles, adminOnly: true },
    ],
  },
  {
    label: 'Administration',
    items: [
      { id: 'users', page: 'users', label: 'Utilisateurs', icon: UserCog, adminOnly: true },
      { id: 'action-history', page: 'action-history', label: 'Historique des actions', icon: ScrollText, adminOnly: true },
      { id: 'settings', page: 'settings', label: 'Paramètres', icon: Settings, adminOnly: true },
    ],
  },
]

export const allNavItems = navGroups.flatMap((g) => g.items)

export function isItemActive(item, route) {
  if (item.page === route.page) {
    if (item.params?.depot) return route.params?.depot === item.params.depot
    return true
  }
  return item.subPages?.includes(route.page) || false
}

export function titleForRoute(route) {
  const match = allNavItems.find((i) => isItemActive(i, route))
  return match?.label || 'Tranombarotra HERNAM'
}
