import { Warehouse, Package, Layers, CheckCircle2, AlertTriangle, XCircle, ArrowLeftRight, ArrowRight } from 'lucide-react'
import { PageHeader, SectionCard, StatusBadge, Badge } from '../components/ui'
import StatCard from '../components/StatCard'
import { useApp } from '../context/AppContext'
import { products, statusForDepot, fmtQty } from '../data/products'
import { company } from '../data/company'
import { ariary } from '../data/formatters'

export default function Depot() {
  const { route, navigate, isAdmin } = useApp()
  const depot = route.params?.depot || 'A'
  const info = company.depots.find((d) => d.id === depot)
  const stockOf = (p) => (depot === 'A' ? p.stockA : p.stockB)

  const inDepot = products.filter((p) => stockOf(p) > 0)
  const value = products.reduce((s, p) => s + stockOf(p) * p.purchasePrice, 0)
  const dispo = products.filter((p) => statusForDepot(p, depot) === 'disponible').length
  const faible = products.filter((p) => statusForDepot(p, depot) === 'faible').length
  const epuise = products.filter((p) => stockOf(p) <= 0).length

  // Comparaison A/B : produits déséquilibrés entre dépôts
  const gaps = products
    .map((p) => {
      const here = stockOf(p)
      const other = depot === 'A' ? p.stockB : p.stockA
      let suggestion = null
      if (here <= 0 && other > 0) suggestion = `Transférer depuis Dépôt ${depot === 'A' ? 'B' : 'A'}`
      else if (here <= p.threshold && other > here) suggestion = `Réassort conseillé (${fmtQty(p, p.threshold)})`
      return { p, here, other, suggestion }
    })
    .filter((g) => g.suggestion)

  return (
    <div>
      <PageHeader title={`Dépôt ${depot}`} subtitle={info?.location} icon={Warehouse}
        actions={<button className="btn-primary" onClick={() => navigate('transfers')}><ArrowLeftRight size={16} /> Transférer</button>} />

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-5 mb-5">
        <StatCard label="Produits présents" value={inDepot.length} icon={Package} tone="brand" />
        {isAdmin && <StatCard label="Valeur du stock" value={ariary(value)} icon={Layers} tone="amber" />}
        <StatCard label="Disponibles" value={dispo} icon={CheckCircle2} tone="emerald" />
        <StatCard label="Faibles" value={faible} icon={AlertTriangle} tone="orange" />
        <StatCard label="Épuisés" value={epuise} icon={XCircle} tone="rose" />
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <SectionCard title={`Produits — Dépôt ${depot}`} className="lg:col-span-2" bodyClass="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead><tr>
                <th className="th">Produit</th><th className="th">Catégorie</th>
                <th className="th text-right">Stock ici</th><th className="th text-right">Autre dépôt</th><th className="th">Statut</th>
              </tr></thead>
              <tbody className="divide-y divide-slate-100">
                {products.map((p) => (
                  <tr key={p.id} className="hover:bg-slate-50">
                    <td className="td font-medium text-slate-800">{p.name}</td>
                    <td className="td text-slate-500">{p.category}</td>
                    <td className="td text-right font-semibold tabular-nums">{fmtQty(p, stockOf(p))}</td>
                    <td className="td text-right tabular-nums text-slate-400">{fmtQty(p, depot === 'A' ? p.stockB : p.stockA)}</td>
                    <td className="td"><StatusBadge status={statusForDepot(p, depot)} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </SectionCard>

        <SectionCard title="Comparaison A / B" subtitle="Suggestions de rééquilibrage" icon={ArrowLeftRight} bodyClass="p-4 space-y-3">
          {gaps.length === 0 && <p className="py-6 text-center text-sm text-slate-400">Aucun déséquilibre notable.</p>}
          {gaps.map(({ p, here, other, suggestion }) => (
            <div key={p.id} className="rounded-xl border border-slate-200 p-3">
              <p className="font-semibold text-slate-800">{p.name}</p>
              <div className="mt-1.5 flex items-center gap-2 text-sm">
                <Badge tone={here <= 0 ? 'red' : 'amber'}>Dépôt {depot} : {fmtQty(p, here)}</Badge>
                <span className="text-slate-300">vs</span>
                <Badge tone="green">Dépôt {depot === 'A' ? 'B' : 'A'} : {fmtQty(p, other)}</Badge>
              </div>
              <button onClick={() => navigate('transfers')} className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-brand-600 hover:text-brand-700">
                {suggestion} <ArrowRight size={13} />
              </button>
            </div>
          ))}
        </SectionCard>
      </div>
    </div>
  )
}
