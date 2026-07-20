import { useState, useMemo } from 'react'
import { Users, Search, UserPlus, Phone, ArrowRight } from 'lucide-react'
import { PageHeader, SectionCard, Badge, Avatar } from '../components/ui'
import Modal from '../components/Modal'
import { useApp } from '../context/AppContext'
import { clients } from '../data/clients'
import { ariary, frDate } from '../data/formatters'

const types = ['Tous', 'Grossiste', 'Détaillant', 'Particulier']
const statusBadge = (s) => (s === 'retard' ? <Badge tone="red" dot>En retard</Badge> : <Badge tone="green" dot>À jour</Badge>)

export default function Clients() {
  const { navigate, notify } = useApp()
  const [q, setQ] = useState('')
  const [type, setType] = useState('Tous')
  const [addOpen, setAddOpen] = useState(false)

  const rows = useMemo(
    () => clients.filter((c) => (type === 'Tous' || c.type === type) && c.name.toLowerCase().includes(q.toLowerCase())),
    [q, type],
  )

  return (
    <div>
      <PageHeader title="Clients" subtitle={`${clients.length} clients enregistrés`} icon={Users}
        actions={<button className="btn-primary" onClick={() => setAddOpen(true)}><UserPlus size={16} /> Nouveau client</button>} />

      <SectionCard bodyClass="p-0">
        <div className="flex flex-wrap items-center gap-2 border-b border-slate-100 p-4">
          <div className="relative min-w-[200px] flex-1">
            <Search size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input className="input pl-9" placeholder="Rechercher un client…" value={q} onChange={(e) => setQ(e.target.value)} />
          </div>
          <select className="input w-auto" value={type} onChange={(e) => setType(e.target.value)}>
            {types.map((t) => <option key={t}>{t}</option>)}
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead><tr>
              <th className="th">Client</th><th className="th">Téléphone</th><th className="th">Type</th>
              <th className="th text-right">Total achats</th><th className="th text-right">Dette</th>
              <th className="th">Dernière vente</th><th className="th">Statut</th><th className="th"></th>
            </tr></thead>
            <tbody className="divide-y divide-slate-100">
              {rows.map((c) => (
                <tr key={c.id} className="cursor-pointer hover:bg-slate-50" onClick={() => navigate('client', { id: c.id })}>
                  <td className="td">
                    <div className="flex items-center gap-2.5">
                      <Avatar name={c.name} size="sm" tone="blue" />
                      <span className="font-semibold text-slate-800">{c.name}</span>
                    </div>
                  </td>
                  <td className="td text-slate-500">{c.phone}</td>
                  <td className="td"><Badge tone="slate">{c.type}</Badge></td>
                  <td className="td text-right tabular-nums">{ariary(c.totalPurchases)}</td>
                  <td className={`td text-right tabular-nums font-semibold ${c.debt > 0 ? 'text-rose-600' : 'text-slate-400'}`}>{c.debt > 0 ? ariary(c.debt) : '—'}</td>
                  <td className="td text-slate-500">{frDate(c.lastSale)}</td>
                  <td className="td">{statusBadge(c.status)}</td>
                  <td className="td text-slate-300"><ArrowRight size={16} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SectionCard>

      <Modal open={addOpen} onClose={() => setAddOpen(false)} title="Nouveau client" icon={UserPlus}
        footer={<>
          <button className="btn-secondary" onClick={() => setAddOpen(false)}>Annuler</button>
          <button className="btn-primary" onClick={() => { setAddOpen(false); notify('Client enregistré (simulation).', { type: 'success' }) }}>Enregistrer</button>
        </>}>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2"><label className="label">Nom du client</label><input className="input" placeholder="Ex : Épicerie Rakoto" /></div>
          <div><label className="label">Téléphone</label><input className="input" placeholder="+261 34 …" /></div>
          <div><label className="label">Type de client</label><select className="input">{types.slice(1).map((t) => <option key={t}>{t}</option>)}</select></div>
          <div><label className="label">Remise autorisée (%)</label><input type="number" className="input" placeholder="0" /></div>
          <div><label className="label">Plafond de crédit (Ar)</label><input type="number" className="input" placeholder="0" /></div>
        </div>
      </Modal>
    </div>
  )
}
