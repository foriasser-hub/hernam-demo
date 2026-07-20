import { useState } from 'react'
import { HandCoins, Wallet, AlertTriangle } from 'lucide-react'
import { PageHeader, SectionCard, Badge, Progress } from '../components/ui'
import StatCard from '../components/StatCard'
import Modal from '../components/Modal'
import { useApp } from '../context/AppContext'
import { clientDebts, remaining } from '../data/debts'
import { clientName } from '../data/clients'
import { ariary, frDate } from '../data/formatters'

const TODAY = new Date('2026-07-20')
const lateDays = (due) => Math.max(0, Math.ceil((TODAY - new Date(due)) / 86400000))
const statusInfo = {
  en_cours: { tone: 'blue', label: 'En cours' },
  partiel: { tone: 'amber', label: 'Partiellement payé' },
  retard: { tone: 'red', label: 'En retard' },
  paye: { tone: 'green', label: 'Payé' },
}

export default function ClientDebts() {
  const { notify } = useApp()
  const [payFor, setPayFor] = useState(null)

  const totalDue = clientDebts.reduce((s, d) => s + remaining(d), 0)
  const nbLate = clientDebts.filter((d) => d.status === 'retard').length

  return (
    <div>
      <PageHeader title="Dettes clients" subtitle="Créances et échéances de paiement" icon={HandCoins} />

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 mb-5">
        <StatCard label="Total à recouvrer" value={ariary(totalDue)} icon={HandCoins} tone="rose" />
        <StatCard label="Dettes en retard" value={nbLate} icon={AlertTriangle} tone="orange" />
        <StatCard label="Nombre de créances" value={clientDebts.length} icon={Wallet} tone="slate" />
      </div>

      <SectionCard bodyClass="p-0">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead><tr>
              <th className="th">Client</th><th className="th">Facture</th><th className="th text-right">Montant initial</th>
              <th className="th text-right">Payé</th><th className="th text-right">Reste à payer</th>
              <th className="th w-40">Progression</th><th className="th">Échéance</th><th className="th">Retard</th><th className="th">Statut</th><th className="th"></th>
            </tr></thead>
            <tbody className="divide-y divide-slate-100">
              {clientDebts.map((d) => {
                const rest = remaining(d)
                const pct = Math.round((d.paid / d.initial) * 100)
                const late = lateDays(d.due)
                const si = statusInfo[d.status]
                return (
                  <tr key={d.id} className="hover:bg-slate-50">
                    <td className="td font-semibold text-slate-800">{clientName(d.clientId)}</td>
                    <td className="td text-brand-700">{d.invoice}</td>
                    <td className="td text-right tabular-nums">{ariary(d.initial)}</td>
                    <td className="td text-right tabular-nums text-emerald-600">{ariary(d.paid)}</td>
                    <td className="td text-right tabular-nums font-semibold text-rose-600">{ariary(rest)}</td>
                    <td className="td"><Progress value={pct} tone={pct >= 100 ? 'brand' : d.status === 'retard' ? 'red' : 'amber'} /><span className="mt-1 block text-[11px] text-slate-400">{pct}%</span></td>
                    <td className="td text-slate-500">{frDate(d.due)}</td>
                    <td className="td">{late > 0 ? <Badge tone="red">{late} j</Badge> : <span className="text-slate-300">—</span>}</td>
                    <td className="td"><Badge tone={si.tone} dot>{si.label}</Badge></td>
                    <td className="td"><button className="btn-ghost px-2 py-1 text-xs" onClick={() => setPayFor(d)}>Encaisser</button></td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </SectionCard>

      <Modal open={!!payFor} onClose={() => setPayFor(null)} title="Encaisser un paiement" subtitle={payFor ? `${clientName(payFor.clientId)} · ${payFor.invoice}` : ''} icon={Wallet}
        footer={<>
          <button className="btn-secondary" onClick={() => setPayFor(null)}>Annuler</button>
          <button className="btn-primary" onClick={() => { setPayFor(null); notify('Paiement encaissé (simulation).', { type: 'success' }) }}>Valider</button>
        </>}>
        {payFor && (
          <div className="space-y-4">
            <div className="rounded-lg bg-slate-50 p-3 text-sm">
              <div className="flex justify-between"><span className="text-slate-500">Reste à payer</span><span className="font-bold text-rose-600">{ariary(remaining(payFor))}</span></div>
            </div>
            <div><label className="label">Montant encaissé (Ar)</label><input type="number" className="input" placeholder="0" /></div>
            <div><label className="label">Mode</label><select className="input"><option>Espèces</option><option>Mobile Money</option></select></div>
          </div>
        )}
      </Modal>
    </div>
  )
}
