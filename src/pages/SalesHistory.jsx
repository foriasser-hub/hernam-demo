import { useState, useMemo } from 'react'
import { History, Search, ShoppingCart, Wallet, CreditCard } from 'lucide-react'
import { PageHeader, SectionCard, Badge } from '../components/ui'
import StatCard from '../components/StatCard'
import { useApp } from '../context/AppContext'
import { sales, paymentInfo } from '../data/sales'
import { clientName } from '../data/clients'
import { ariary, frDateTime } from '../data/formatters'

export default function SalesHistory() {
  const { navigate } = useApp()
  const [q, setQ] = useState('')
  const [pay, setPay] = useState('all')
  const [depot, setDepot] = useState('all')

  const rows = useMemo(
    () => sales.filter((s) =>
      (pay === 'all' || s.payment === pay) &&
      (depot === 'all' || s.depot === depot) &&
      (clientName(s.clientId).toLowerCase().includes(q.toLowerCase()) || s.id.toLowerCase().includes(q.toLowerCase()))),
    [q, pay, depot],
  )
  const totalCA = sales.reduce((s, x) => s + x.total, 0)
  const totalPaid = sales.reduce((s, x) => s + x.paid, 0)
  const totalCredit = totalCA - totalPaid

  return (
    <div>
      <PageHeader title="Historique des ventes" subtitle={`${sales.length} ventes enregistrées`} icon={History}
        actions={<button className="btn-primary" onClick={() => navigate('new-sale')}><ShoppingCart size={16} /> Nouvelle vente</button>} />

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 mb-5">
        <StatCard label="Chiffre d'affaires" value={ariary(totalCA)} icon={ShoppingCart} tone="brand" />
        <StatCard label="Encaissé" value={ariary(totalPaid)} icon={Wallet} tone="emerald" />
        <StatCard label="À crédit / en attente" value={ariary(totalCredit)} icon={CreditCard} tone="rose" />
      </div>

      <SectionCard bodyClass="p-0">
        <div className="flex flex-wrap items-center gap-2 border-b border-slate-100 p-4">
          <div className="relative min-w-[200px] flex-1">
            <Search size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input className="input pl-9" placeholder="Rechercher (client, n° facture)…" value={q} onChange={(e) => setQ(e.target.value)} />
          </div>
          <select className="input w-auto" value={pay} onChange={(e) => setPay(e.target.value)}>
            <option value="all">Tous paiements</option><option value="especes">Espèces</option><option value="mobile">Mobile Money</option>
            <option value="credit">Crédit</option><option value="partiel">Partiel</option>
          </select>
          <select className="input w-auto" value={depot} onChange={(e) => setDepot(e.target.value)}>
            <option value="all">Tous dépôts</option><option value="A">Dépôt A</option><option value="B">Dépôt B</option>
          </select>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead><tr>
              <th className="th">Facture</th><th className="th">Date</th><th className="th">Client</th><th className="th">Vendeur</th>
              <th className="th">Dépôt</th><th className="th text-right">Articles</th><th className="th">Paiement</th><th className="th text-right">Total</th>
            </tr></thead>
            <tbody className="divide-y divide-slate-100">
              {rows.map((s) => {
                const pi = paymentInfo(s.payment)
                return (
                  <tr key={s.id} className="cursor-pointer hover:bg-slate-50" onClick={() => navigate('invoice', { id: s.id })}>
                    <td className="td font-semibold text-brand-700">{s.id}</td>
                    <td className="td text-slate-500">{frDateTime(s.date)}</td>
                    <td className="td font-medium text-slate-800">{clientName(s.clientId)}</td>
                    <td className="td text-slate-500">{s.seller}</td>
                    <td className="td"><Badge tone="slate">Dépôt {s.depot}</Badge></td>
                    <td className="td text-right tabular-nums text-slate-500">{s.items.length}</td>
                    <td className="td"><Badge tone={pi.tone}>{pi.label}</Badge></td>
                    <td className="td text-right font-semibold tabular-nums">{ariary(s.total)}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </SectionCard>
    </div>
  )
}
