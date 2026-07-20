import { X, Lock } from 'lucide-react'
import { useApp } from '../context/AppContext'
import { navGroups, isItemActive } from '../data/nav'
import { company } from '../data/company'
import { clientDebts, supplierDebts } from '../data/debts'

// Compteurs d'alerte affichés dans le menu
const navBadges = {
  'client-debts': clientDebts.filter((d) => d.status === 'retard').length,
  'supplier-debts': supplierDebts.filter((d) => d.status === 'urgent').length,
}

export default function Sidebar() {
  const { route, navigate, isAdmin, sidebarOpen, setSidebarOpen } = useApp()

  return (
    <>
      {/* Voile mobile */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-30 bg-slate-900/40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-72 flex-col border-r border-slate-200 bg-white transition-transform duration-200 lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* En-tête société */}
        <div className="flex items-center gap-3 border-b border-slate-100 px-5 h-16 shrink-0">
          <img src="/logo.svg" alt="Logo" className="h-9 w-9 rounded-lg" />
          <div className="min-w-0 flex-1">
            <p className="font-extrabold leading-tight text-slate-900 truncate">Tranombarotra</p>
            <p className="text-xs font-semibold text-brand-600 leading-tight">HERNAM</p>
          </div>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-slate-400 hover:text-slate-600">
            <X size={20} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-5">
          {navGroups.map((group) => {
            const items = group.items.filter((i) => isAdmin || !i.adminOnly)
            if (items.length === 0) return null
            return (
              <div key={group.label}>
                <p className="px-3 mb-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400">{group.label}</p>
                <div className="space-y-0.5">
                  {items.map((item) => {
                    const active = isItemActive(item, route)
                    const Icon = item.icon
                    const badge = navBadges[item.id]
                    return (
                      <button
                        key={item.id}
                        onClick={() => navigate(item.page, item.params || {})}
                        className={`group flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                          active ? 'bg-brand-50 text-brand-700' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                        }`}
                      >
                        <Icon size={18} className={active ? 'text-brand-600' : 'text-slate-400 group-hover:text-slate-500'} />
                        <span className="flex-1 text-left truncate">{item.label}</span>
                        {badge > 0 && (
                          <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-rose-500 px-1.5 text-[11px] font-bold text-white">
                            {badge}
                          </span>
                        )}
                        {item.adminOnly && <Lock size={12} className="text-slate-300" />}
                      </button>
                    )
                  })}
                </div>
              </div>
            )
          })}
        </nav>

        {/* Pied société */}
        <div className="border-t border-slate-100 px-5 py-3 text-[11px] text-slate-400 leading-relaxed shrink-0">
          <p className="truncate">{company.nif}</p>
          <p className="truncate">{company.phone}</p>
        </div>
      </aside>
    </>
  )
}
