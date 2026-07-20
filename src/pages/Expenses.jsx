import { useState, useMemo } from 'react'
import { Receipt, Plus, Filter, Wallet } from 'lucide-react'
import { PageHeader, SectionCard, Badge } from '../components/ui'
import StatCard from '../components/StatCard'
import Modal from '../components/Modal'
import { useApp } from '../context/AppContext'
import { expenses, expenseCategories } from '../data/expenses'
import { ariary, frDate } from '../data/formatters'

const catTone = {
  Transport: 'blue', Dockers: 'amber', Salaires: 'purple', Loyer: 'orange',
  Électricité: 'red', Livraison: 'green', Entretien: 'slate', Communication: 'blue', Autres: 'slate',
}

export default function Expenses() {
  const { notify } = useApp()
  const [cat, setCat] = useState('all')
  const [depot, setDepot] = useState('all')
  const [addOpen, setAddOpen] = useState(false)

  const rows = useMemo(
    () => expenses.filter((e) => (cat === 'all' || e.category === cat) && (depot === 'all' || e.depot === depot)),
    [cat, depot],
  )
  const total = rows.reduce((s, e) => s + e.amount, 0)
  const totalAll = expenses.reduce((s, e) => s + e.amount, 0)
  const topCat = expenseCategories
    .map((c) => ({ c, v: expenses.filter((e) => e.category === c).reduce((s, e) => s + e.amount, 0) }))
    .sort((a, b) => b.v - a.v)[0]

  return (
    <div>
      <PageHeader title="Dépenses" subtitle="Suivi des charges et frais" icon={Receipt}
        actions={<button className="btn-primary" onClick={() => setAddOpen(true)}><Plus size={16} /> Nouvelle dépense</button>} />

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-3 mb-5">
        <StatCard label="Total des dépenses (mois)" value={ariary(totalAll)} icon={Wallet} tone="rose" />
        <StatCard label="Nombre d'opérations" value={expenses.length} icon={Receipt} tone="slate" />
        <StatCard label="Poste le plus élevé" value={topCat.c} hint={ariary(topCat.v)} icon={Filter} tone="amber" />
      </div>

      <SectionCard bodyClass="p-0">
        <div className="flex flex-wrap items-center gap-2 border-b border-slate-100 p-4">
          <select className="input w-auto" value={cat} onChange={(e) => setCat(e.target.value)}>
            <option value="all">Toutes catégories</option>
            {expenseCategories.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
          <select className="input w-auto" value={depot} onChange={(e) => setDepot(e.target.value)}>
            <option value="all">Tous les dépôts</option><option value="A">Dépôt A</option><option value="B">Dépôt B</option>
          </select>
          <span className="ml-auto text-sm text-slate-500">Total filtré : <b className="text-slate-800">{ariary(total)}</b></span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead><tr>
              <th className="th">Date</th><th className="th">Catégorie</th><th className="th text-right">Montant</th>
              <th className="th">Dépôt</th><th className="th">Responsable</th><th className="th">Motif</th>
            </tr></thead>
            <tbody className="divide-y divide-slate-100">
              {rows.map((e) => (
                <tr key={e.id} className="hover:bg-slate-50">
                  <td className="td text-slate-500">{frDate(e.date)}</td>
                  <td className="td"><Badge tone={catTone[e.category] || 'slate'}>{e.category}</Badge></td>
                  <td className="td text-right font-semibold tabular-nums text-rose-600">{ariary(e.amount)}</td>
                  <td className="td"><Badge tone="slate">Dépôt {e.depot}</Badge></td>
                  <td className="td text-slate-600">{e.responsible}</td>
                  <td className="td text-slate-500 max-w-[240px] truncate">{e.reason}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SectionCard>

      <Modal open={addOpen} onClose={() => setAddOpen(false)} title="Nouvelle dépense" icon={Receipt}
        footer={<>
          <button className="btn-secondary" onClick={() => setAddOpen(false)}>Annuler</button>
          <button className="btn-primary" onClick={() => { setAddOpen(false); notify('Dépense enregistrée (simulation).', { type: 'success' }) }}>Enregistrer</button>
        </>}>
        <div className="grid gap-4 sm:grid-cols-2">
          <div><label className="label">Catégorie</label><select className="input">{expenseCategories.map((c) => <option key={c}>{c}</option>)}</select></div>
          <div><label className="label">Montant (Ar)</label><input type="number" className="input" placeholder="0" /></div>
          <div><label className="label">Dépôt</label><select className="input"><option>Dépôt A</option><option>Dépôt B</option></select></div>
          <div><label className="label">Responsable</label><input className="input" placeholder="Nom" /></div>
          <div className="sm:col-span-2"><label className="label">Motif</label><input className="input" placeholder="Description de la dépense" /></div>
        </div>
      </Modal>
    </div>
  )
}
