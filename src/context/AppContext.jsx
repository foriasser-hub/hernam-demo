import { createContext, useContext, useState, useCallback, useMemo } from 'react'
import { users } from '../data/users'

const AppContext = createContext(null)

export function AppProvider({ children }) {
  // Rôle simulé : 'admin' | 'vendeur' (bascule via l'en-tête)
  const [role, setRole] = useState('admin')
  // Navigation interne (maquette, sans routeur réel)
  const [route, setRoute] = useState({ page: 'dashboard', params: {} })
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [toasts, setToasts] = useState([])

  const navigate = useCallback((page, params = {}) => {
    setRoute({ page, params })
    setSidebarOpen(false)
    const main = document.getElementById('main-scroll')
    if (main) main.scrollTo({ top: 0, behavior: 'auto' })
  }, [])

  const notify = useCallback((message, opts = {}) => {
    const id = Math.random().toString(36).slice(2)
    setToasts((t) => [...t, { id, message, type: opts.type || 'success', title: opts.title }])
    const duration = opts.duration || 3500
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), duration)
  }, [])

  const dismissToast = useCallback((id) => setToasts((t) => t.filter((x) => x.id !== id)), [])

  const isAdmin = role === 'admin'
  const currentUser = useMemo(
    () => (role === 'admin' ? users.find((u) => u.role === 'admin') : users.find((u) => u.role === 'vendeur')),
    [role],
  )

  const value = {
    role, setRole, isAdmin, currentUser,
    route, navigate,
    sidebarOpen, setSidebarOpen,
    toasts, notify, dismissToast,
  }
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export const useApp = () => useContext(AppContext)
