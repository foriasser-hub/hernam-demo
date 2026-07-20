import { useState } from 'react'
import { Menu, Search, Bell, ShieldCheck, User, ChevronDown, AlertTriangle, Info, ShoppingCart, Package } from 'lucide-react'
import { useApp } from '../context/AppContext'
import { allNavItems, isItemActive, titleForRoute } from '../data/nav'
import { alerts } from '../data/insights'
import { products, statusOf } from '../data/products'
import { clients } from '../data/clients'
import { Avatar } from './ui'
import { roleLabel } from '../data/users'

const sevIcon = { danger: AlertTriangle, warning: AlertTriangle, info: Info }
const sevColor = { danger: 'text-rose-500', warning: 'text-amber-500', info: 'text-blue-500' }

export default function Header() {
  const { route, navigate, role, setRole, isAdmin, currentUser, setSidebarOpen, notify } = useApp()
  const [open, setOpen] = useState(null) // 'notif' | 'user' | 'search' | null
  const [query, setQuery] = useState('')

  const currentItem = allNavItems.find((i) => isItemActive(i, route))
  const title = titleForRoute(route)

  const q = query.trim().toLowerCase()
  const productHits = q ? products.filter((p) => p.name.toLowerCase().includes(q)).slice(0, 4) : []
  const clientHits = q ? clients.filter((c) => c.name.toLowerCase().includes(q)).slice(0, 3) : []
  const hasHits = productHits.length + clientHits.length > 0

  const switchRole = (r) => {
    setRole(r)
    notify(`Vous êtes maintenant connecté en tant que ${roleLabel(r)}.`, { type: 'info', title: 'Rôle modifié' })
    if (r === 'vendeur' && currentItem?.adminOnly) navigate('dashboard')
  }

  const closeAll = () => setOpen(null)

  return (
    <header className="sticky top-0 z-20 flex h-16 items-center gap-3 border-b border-slate-200 bg-white/90 px-4 backdrop-blur lg:px-6">
      <button onClick={() => setSidebarOpen(true)} className="lg:hidden text-slate-500 hover:text-slate-800">
        <Menu size={22} />
      </button>

      <h1 className="text-base font-bold text-slate-800 lg:hidden truncate">{title}</h1>

      {/* Recherche rapide */}
      <div className="relative ml-auto hidden sm:block w-64 lg:w-80">
        <Search size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          value={query}
          onChange={(e) => { setQuery(e.target.value); setOpen('search') }}
          onFocus={() => setOpen('search')}
          placeholder="Rechercher produit, client…"
          className="input pl-9 py-2 bg-slate-50"
        />
        {open === 'search' && q && (
          <>
            <div className="fixed inset-0 z-10" onClick={closeAll} />
            <div className="absolute left-0 right-0 top-12 z-20 rounded-xl border border-slate-200 bg-white p-2 shadow-soft animate-fade-in">
              {!hasHits && <p className="px-3 py-4 text-center text-sm text-slate-400">Aucun résultat pour « {query} »</p>}
              {productHits.length > 0 && (
                <div className="mb-1">
                  <p className="px-2 py-1 text-[10px] font-bold uppercase text-slate-400">Produits</p>
                  {productHits.map((p) => (
                    <button key={p.id} onClick={() => { navigate('stock'); closeAll(); setQuery('') }}
                      className="flex w-full items-center gap-2 rounded-lg px-2 py-2 text-left text-sm hover:bg-slate-50">
                      <Package size={15} className="text-brand-500" />
                      <span className="flex-1 truncate">{p.name}</span>
                      <span className="text-xs text-slate-400">{p.category}</span>
                    </button>
                  ))}
                </div>
              )}
              {clientHits.length > 0 && (
                <div>
                  <p className="px-2 py-1 text-[10px] font-bold uppercase text-slate-400">Clients</p>
                  {clientHits.map((c) => (
                    <button key={c.id} onClick={() => { navigate('client', { id: c.id }); closeAll(); setQuery('') }}
                      className="flex w-full items-center gap-2 rounded-lg px-2 py-2 text-left text-sm hover:bg-slate-50">
                      <User size={15} className="text-blue-500" />
                      <span className="flex-1 truncate">{c.name}</span>
                      <span className="text-xs text-slate-400">{c.type}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </>
        )}
      </div>

      {/* Sélecteur de rôle */}
      <div className="flex items-center rounded-lg bg-slate-100 p-0.5 text-sm font-semibold ml-auto sm:ml-0">
        <button
          onClick={() => switchRole('admin')}
          className={`flex items-center gap-1.5 rounded-md px-2.5 py-1.5 transition ${isAdmin ? 'bg-white text-brand-700 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
        >
          <ShieldCheck size={15} /> <span className="hidden sm:inline">Admin</span>
        </button>
        <button
          onClick={() => switchRole('vendeur')}
          className={`flex items-center gap-1.5 rounded-md px-2.5 py-1.5 transition ${!isAdmin ? 'bg-white text-brand-700 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
        >
          <User size={15} /> <span className="hidden sm:inline">Vendeur</span>
        </button>
      </div>

      {/* Notifications */}
      <div className="relative">
        <button onClick={() => setOpen(open === 'notif' ? null : 'notif')} className="relative rounded-lg p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-800">
          <Bell size={20} />
          <span className="absolute right-1.5 top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-rose-500 text-[10px] font-bold text-white">
            {alerts.length}
          </span>
        </button>
        {open === 'notif' && (
          <>
            <div className="fixed inset-0 z-10" onClick={closeAll} />
            <div className="absolute right-0 top-12 z-20 w-80 rounded-xl border border-slate-200 bg-white shadow-soft animate-fade-in">
              <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3">
                <p className="font-semibold text-slate-800">Notifications</p>
                <span className="text-xs text-slate-400">{alerts.length} alertes</span>
              </div>
              <div className="max-h-96 overflow-y-auto">
                {alerts.map((a) => {
                  const Icon = sevIcon[a.severity]
                  return (
                    <div key={a.id} className="flex gap-3 border-b border-slate-50 px-4 py-3 last:border-0 hover:bg-slate-50">
                      <Icon size={18} className={`${sevColor[a.severity]} shrink-0 mt-0.5`} />
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-slate-800">{a.title}</p>
                        <p className="text-xs text-slate-500">{a.text}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
              <button onClick={() => { navigate('dashboard'); closeAll() }} className="w-full rounded-b-xl py-2.5 text-center text-sm font-semibold text-brand-600 hover:bg-brand-50">
                Voir le tableau de bord
              </button>
            </div>
          </>
        )}
      </div>

      {/* Utilisateur */}
      <div className="relative">
        <button onClick={() => setOpen(open === 'user' ? null : 'user')} className="flex items-center gap-2 rounded-lg py-1 pl-1 pr-2 hover:bg-slate-100">
          <Avatar name={currentUser?.name} size="sm" />
          <div className="hidden text-left md:block">
            <p className="text-sm font-semibold leading-tight text-slate-800">{currentUser?.name}</p>
            <p className="text-[11px] leading-tight text-slate-400">{roleLabel(role)}</p>
          </div>
          <ChevronDown size={15} className="text-slate-400" />
        </button>
        {open === 'user' && (
          <>
            <div className="fixed inset-0 z-10" onClick={closeAll} />
            <div className="absolute right-0 top-12 z-20 w-56 rounded-xl border border-slate-200 bg-white p-1.5 shadow-soft animate-fade-in">
              <div className="border-b border-slate-100 px-3 py-2.5">
                <p className="text-sm font-semibold text-slate-800">{currentUser?.name}</p>
                <p className="text-xs text-slate-400">{currentUser?.phone}</p>
              </div>
              <button onClick={() => { navigate('settings'); closeAll() }} disabled={!isAdmin}
                className="mt-1 w-full rounded-lg px-3 py-2 text-left text-sm text-slate-600 hover:bg-slate-50 disabled:opacity-40">
                Paramètres
              </button>
              <button onClick={() => { notify('Déconnexion simulée.', { type: 'info' }); closeAll() }}
                className="w-full rounded-lg px-3 py-2 text-left text-sm text-rose-600 hover:bg-rose-50">
                Se déconnecter
              </button>
            </div>
          </>
        )}
      </div>
    </header>
  )
}
