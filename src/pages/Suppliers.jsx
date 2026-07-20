import { useState } from 'react'
import { Truck, Search, Plus, CalendarClock } from 'lucide-react'
import { PageHeader, SectionCard, Badge, Avatar } from '../components/ui'
import Modal from '../components/Modal'
import { useApp } from '../context/AppContext'
import { suppliers } from '../data/suppliers'
import { ariary, frDate } from '../data/formatters'

const daysUntil = (iso) => (iso ? Math.ceil((new Date(iso) - new Date('2026-07-20')) / 86400000) : null)

export default function Suppliers() {
  const { navigate, notify } = useApp()
  const [q, setQ] = useState('')
  const [addOpen, setAddOpen] = useState(false)
  const rows = suppliers.filter((s) => s.name.toLowerCase().includes(q.toLowerCase()))

  return (
    <div>
      <PageHeader title="Fournisseurs" subtitle={`${suppliers.length} fournisseurs`} icon={Truck}
        actions={<button className="btn-primary" onClick={() => setAddOpen(true)}><Plus size={16} /> Nouveau fournisseur</button>} />

      <SectionCard bodyClass="p-0">
        <div className="border-b border-slate-100 p-4">
          <div className="relative max-w-sm">
            <Search size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input className="input pl-9" placeholder="Rechercher un fournisseur…" value={q} onChange={(e) => setQ(e.target.value)} />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead><tr>
              <th className="th">Fournisseur</th><th className="th">Téléphone</th><th className="th">Produits fournis</th>
              <th className="th text-right">Total achats</th><th className="th text-right">Total payé</th>
              <th className="th text-right">Reste à payer</th><th className="th">Prochaine échéance</th>
            </tr></thead>
            <tbody className="divide-y divide-slate-100">
              {rows.map((s) => {
                const reste = s.totalPurchases - s.totalPaid
                const d = daysUntil(s.nextDue)
                return (
                  <tr key={s.id} className="cursor-pointer hover:bg-slate-50" onClick={() => navigate('supplier-debts')}>
                    <td className="td">
                      <div className="flex items-center gap-2.5">
                        <Avatar name={s.name} size="sm" tone="amber" />
                        <span className="font-semibold text-slate-800">{s.name}</span>
                      </div>
                    </td>
                    <td className="td text-slate-500">{s.phone}</td>
                    <td className="td text-slate-500 max-w-[200px] truncate">{s.products}</td>
                    <td className="td text-right tabular-nums">{ariary(s.totalPurchases)}</td>
                    <td className="td text-right tabular-nums text-emerald-600">{ariary(s.totalPaid)}</td>
                    <td className={`td text-right tabular-nums font-semibold ${reste > 0 ? 'text-rose-600' : 'text-slate-400'}`}>{reste > 0 ? ariary(reste) : '—'}</td>
                    <td className="td">
                      {s.nextDue ? (
                        <span className="inline-flex items-center gap-1.5">
                          <CalendarClock size={14} className={d <= 3 ? 'text-rose-500' : 'text-slate-400'} />
                          <span className={d <= 3 ? 'font-semibold text-rose-600' : 'text-slate-500'}>{frDate(s.nextDue)}</span>
                          {d <= 3 && <Badge tone="red">J−{d}</Badge>}
                        </span>
                      ) : <Badge tone="green">À jour</Badge>}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </SectionCard>

      <Modal open={addOpen} onClose={() => setAddOpen(false)} title="Nouveau fournisseur" icon={Truck}
        footer={<>
          <button className="btn-secondary" onClick={() => setAddOpen(false)}>Annuler</button>
          <button className="btn-primary" onClick={() => { setAddOpen(false); notify('Fournisseur enregistré (simulation).', { type: 'success' }) }}>Enregistrer</button>
        </>}>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2"><label className="label">Nom / Raison sociale</label><input className="input" placeholder="Ex : SOMADA Import" /></div>
          <div><label className="label">Téléphone</label><input className="input" placeholder="+261 …" /></div>
          <div><label className="label">Produits fournis</label><input className="input" placeholder="Riz, sucre…" /></div>
        </div>
      </Modal>
    </div>
  )
}
