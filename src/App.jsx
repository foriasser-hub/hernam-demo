import { AppProvider, useApp } from './context/AppContext'
import Layout from './components/Layout'
import { EmptyState } from './components/ui'
import { ShieldAlert } from 'lucide-react'

import Dashboard from './pages/Dashboard'
import NewSale from './pages/NewSale'
import SalesHistory from './pages/SalesHistory'
import Invoices from './pages/Invoices'
import InvoicePreview from './pages/InvoicePreview'
import PurchaseOrders from './pages/PurchaseOrders'
import Stock from './pages/Stock'
import Depot from './pages/Depot'
import Transfers from './pages/Transfers'
import StockEntries from './pages/StockEntries'
import Clients from './pages/Clients'
import ClientDetail from './pages/ClientDetail'
import ClientDebts from './pages/ClientDebts'
import Suppliers from './pages/Suppliers'
import SupplierDebts from './pages/SupplierDebts'
import Expenses from './pages/Expenses'
import Cash from './pages/Cash'
import Reports from './pages/Reports'
import AiAdvisor from './pages/AiAdvisor'
import UsersPage from './pages/Users'
import ActionHistory from './pages/ActionHistory'
import Settings from './pages/Settings'

const pages = {
  dashboard: Dashboard,
  'new-sale': NewSale,
  'sales-history': SalesHistory,
  invoices: Invoices,
  invoice: InvoicePreview,
  'purchase-orders': PurchaseOrders,
  stock: Stock,
  depot: Depot,
  transfers: Transfers,
  'stock-entries': StockEntries,
  clients: Clients,
  client: ClientDetail,
  'client-debts': ClientDebts,
  suppliers: Suppliers,
  'supplier-debts': SupplierDebts,
  expenses: Expenses,
  cash: Cash,
  reports: Reports,
  ai: AiAdvisor,
  users: UsersPage,
  'action-history': ActionHistory,
  settings: Settings,
}

// Pages réservées à l'administrateur
const adminOnlyPages = new Set([
  'transfers', 'stock-entries', 'suppliers', 'supplier-debts',
  'expenses', 'cash', 'ai', 'users', 'action-history', 'settings',
])

function Router() {
  const { route, isAdmin } = useApp()
  const Page = pages[route.page] || Dashboard

  if (adminOnlyPages.has(route.page) && !isAdmin) {
    return (
      <EmptyState
        icon={ShieldAlert}
        title="Accès réservé à l'administrateur"
        text="Cette section n'est pas accessible avec le rôle Vendeur. Basculez sur le rôle Administrateur depuis l'en-tête pour y accéder."
      />
    )
  }
  return <Page />
}

export default function App() {
  return (
    <AppProvider>
      <Layout>
        <Router />
      </Layout>
    </AppProvider>
  )
}
