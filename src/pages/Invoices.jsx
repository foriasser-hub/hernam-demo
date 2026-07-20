import { useState } from 'react'
import { FileText, Search, Eye } from 'lucide-react'
import { PageHeader, SectionCard, Badge } from '../components/ui'
import { useApp } from '../context/AppContext'
import { sales, paymentInfo } from '../data/sales'
import { clientName } from '../data/clients'
import { ariary, frDate } from '../data/formatters'

export default function Invoices() {
  const { navigate } = useApp()
  const [q, setQ] = useState('')
  const rows = sales.filter((s) => s.id.toLowerCase().includes(q.toLowerCase()) || clientName(s.clientId).toLowerCase().includes(q.toLowerCase()))

  return (
    <div>
      <PageHeader title="Factures" subtitle={`${sales.length} factures émises`} icon={FileText} />

      <SectionCard bodyClass="p-0">
        <div className="border-b border-slate-100 p-4">
          <div className="relative max-w-sm">
            <Search size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input className="input pl-9" placeholder="Rechercher (n° facture, client)…" value={q} onChange={(e) => setQ(e.target.value)} />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead><tr>
              <th className="th">N° Facture</th><th className="th">Date</th><th className="th">Client</th>
              <th className="th">Paiement</th><th className="th text-right">Montant</th><th className="th text-right">Reste</th><th className="th"></th>
            </tr></thead>
            <tbody className="divide-y divide-slate-100">
              {rows.map((s) => {
                const pi = paymentInfo(s.payment)
                const reste = s.total - s.paid
                return (
                  <tr key={s.id} className="cursor-pointer hover:bg-slate-50" onClick={() => navigate('invoice', { id: s.id })}>
                    <td className="td font-semibold text-brand-700">{s.id}</td>
                    <td className="td text-slate-500">{frDate(s.date)}</td>
                    <td className="td font-medium text-slate-800">{clientName(s.clientId)}</td>
                    <td className="td"><Badge tone={pi.tone}>{pi.label}</Badge></td>
                    <td className="td text-right font-semibold tabular-nums">{ariary(s.total)}</td>
                    <td className={`td text-right tabular-nums ${reste > 0 ? 'text-rose-600 font-semibold' : 'text-slate-400'}`}>{reste > 0 ? ariary(reste) : '—'}</td>
                    <td className="td text-slate-400"><Eye size={16} /></td>
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
