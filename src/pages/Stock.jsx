import { useState, useMemo } from 'react'
import { Boxes, Search, Package, Layers, AlertTriangle, XCircle, ShoppingCart } from 'lucide-react'
import { PageHeader, SectionCard, StatusBadge, Badge } from '../components/ui'
import StatCard from '../components/StatCard'
import Modal from '../components/Modal'
import { useApp } from '../context/AppContext'
import { products, categories, totalStock, statusOf, fmtQty } from '../data/products'
import { supplierName } from '../data/suppliers'
import { ariary } from '../data/formatters'

const statusOptions = [
  { id: 'all', label: 'Tous les statuts' },
  { id: 'disponible', label: 'Disponible' },
  { id: 'faible', label: 'Faible' },
  { id: 'epuise', label: 'Épuisé' },
  { id: 'perime', label: 'Bientôt périmé' },
]

export default function Stock() {
  const { isAdmin, navigate } = useApp()
  const [q, setQ] = useState('')
  const [cat, setCat] = useState('all')
  const [status, setStatus] = useState('all')
  const [detail, setDetail] = useState(null)

  const rows = useMemo(() => {
    return products.filter((p) => {
      if (q && !p.name.toLowerCase().includes(q.toLowerCase())) return false
      if (cat !== 'all' && p.category !== cat) return false
      if (status !== 'all' && statusOf(p) !== status) return false
      return true
    })
  }, [q, cat, status])

  const stockValue = products.reduce((s, p) => s + totalStock(p) * p.purchasePrice, 0)
  const nbFaible = products.filter((p) => statusOf(p) === 'faible').length
  const nbEpuise = products.filter((p) => statusOf(p) === 'epuise').length

  return (
    <div>
      <PageHeader title="Stock" subtitle="Catalogue et niveaux de stock (2 dépôts)" icon={Boxes} />

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4 mb-5">
        <StatCard label="Produits référencés" value={products.length} icon={Package} tone="brand" />
        {isAdmin && <StatCard label="Valeur du stock" value={ariary(stockValue)} icon={Layers} tone="amber" />}
        <StatCard label="Produits faibles" value={nbFaible} icon={AlertTriangle} tone="orange" />
        <StatCard label="Produits épuisés" value={nbEpuise} icon={XCircle} tone="rose" />
      </div>

      <SectionCard bodyClass="p-0">
        {/* Barre de filtres */}
        <div className="flex flex-wrap items-center gap-2 border-b border-slate-100 p-4">
          <div className="relative min-w-[200px] flex-1">
            <Search size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input className="input pl-9" placeholder="Rechercher un produit…" value={q} onChange={(e) => setQ(e.target.value)} />
          </div>
          <select className="input w-auto" value={cat} onChange={(e) => setCat(e.target.value)}>
            <option value="all">Toutes catégories</option>
            {categories.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
          <select className="input w-auto" value={status} onChange={(e) => setStatus(e.target.value)}>
            {statusOptions.map((s) => <option key={s.id} value={s.id}>{s.label}</option>)}
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr>
                <th className="th">Produit</th><th className="th">Catégorie</th><th className="th">Fournisseur</th>
                <th className="th text-right">Dépôt A</th><th className="th text-right">Dépôt B</th><th className="th text-right">Total</th>
                {isAdmin && <th className="th text-right">Prix achat</th>}
                <th className="th text-right">Prix gros</th><th className="th text-right">Prix détail</th>
                <th className="th text-right">Seuil</th><th className="th">Statut</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {rows.map((p) => (
                <tr key={p.id} className="cursor-pointer hover:bg-slate-50" onClick={() => setDetail(p)}>
                  <td className="td">
                    <div className="font-semibold text-slate-800">{p.name}</div>
                    <div className="text-xs text-slate-400">{p.units.length} unités de vente</div>
                  </td>
                  <td className="td text-slate-500">{p.category}</td>
                  <td className="td text-slate-500">{supplierName(p.supplierId)}</td>
                  <td className="td text-right tabular-nums">{fmtQty(p, p.stockA)}</td>
                  <td className="td text-right tabular-nums">{fmtQty(p, p.stockB)}</td>
                  <td className="td text-right font-semibold tabular-nums">{fmtQty(p, totalStock(p))}</td>
                  {isAdmin && <td className="td text-right tabular-nums text-slate-500">{ariary(p.purchasePrice)}</td>}
                  <td className="td text-right tabular-nums">{ariary(p.wholesalePrice)}</td>
                  <td className="td text-right tabular-nums">{ariary(p.retailPrice)}</td>
                  <td className="td text-right tabular-nums text-slate-400">{fmtQty(p, p.threshold)}</td>
                  <td className="td"><StatusBadge status={statusOf(p)} /></td>
                </tr>
              ))}
            </tbody>
          </table>
          {rows.length === 0 && <p className="py-10 text-center text-sm text-slate-400">Aucun produit ne correspond aux filtres.</p>}
        </div>
      </SectionCard>

      {/* Modal détail produit + vente multi-unités */}
      <Modal open={!!detail} onClose={() => setDetail(null)} title={detail?.name} subtitle={detail ? `${detail.category} · ${supplierName(detail.supplierId)}` : ''} icon={Package}
        footer={<>
          <button className="btn-secondary" onClick={() => setDetail(null)}>Fermer</button>
          <button className="btn-primary" onClick={() => navigate('new-sale')}><ShoppingCart size={16} /> Vendre</button>
        </>}>
        {detail && (
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="rounded-lg bg-slate-50 p-3"><p className="text-xs text-slate-400">Dépôt A</p><p className="font-bold text-slate-800">{fmtQty(detail, detail.stockA)}</p></div>
              <div className="rounded-lg bg-slate-50 p-3"><p className="text-xs text-slate-400">Dépôt B</p><p className="font-bold text-slate-800">{fmtQty(detail, detail.stockB)}</p></div>
              <div className="rounded-lg bg-brand-50 p-3"><p className="text-xs text-brand-600">Total</p><p className="font-bold text-brand-700">{fmtQty(detail, totalStock(detail))}</p></div>
            </div>

            <div>
              <p className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700">
                <Layers size={16} className="text-brand-500" /> Vente par plusieurs unités
              </p>
              <div className="overflow-hidden rounded-lg border border-slate-200">
                <table className="w-full text-sm">
                  <thead><tr>
                    <th className="th">Unité</th><th className="th text-right">Contient</th>
                    <th className="th">Tarif</th><th className="th text-right">Prix indicatif</th>
                  </tr></thead>
                  <tbody className="divide-y divide-slate-100">
                    {detail.units.map((u, i) => (
                      <tr key={i}>
                        <td className="td font-medium text-slate-700">{u.label}</td>
                        <td className="td text-right text-slate-500">{fmtQty(detail, u.factor)}</td>
                        <td className="td"><Badge tone={u.tier === 'gros' ? 'blue' : 'slate'}>{u.tier === 'gros' ? 'Gros' : 'Détail'}</Badge></td>
                        <td className="td text-right font-semibold tabular-nums">
                          {ariary(Math.round((u.tier === 'gros' ? detail.wholesalePrice : detail.retailPrice) * u.factor))}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="mt-2 text-xs text-slate-500">
                Conversion automatique : vendre <b>{fmtQty(detail, detail.units.find((u) => u.factor < detail.units[0].factor)?.factor || 1)}</b> déduit
                automatiquement la quantité correspondante du stock exprimé en {detail.baseUnit}.
              </p>
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}
