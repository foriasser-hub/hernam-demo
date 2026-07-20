import { useState } from 'react'
import { ReceiptText, Wallet, AlertTriangle, CalendarClock } from 'lucide-react'
import { PageHeader, SectionCard, Badge, Progress } from '../components/ui'
import StatCard from '../components/StatCard'
import Modal from '../components/Modal'
import { useApp } from '../context/AppContext'
import { supplierDebts, remaining } from '../data/debts'
import { supplierName } from '../data/suppliers'
import { ariary, frDate } from '../data/formatters'

const TODAY = new Date('2026-07-20')
const daysUntil = (due) => Math.ceil((new Date(due) - TODAY) / 86400000)
const statusInfo = {
  a_payer: { tone: 'blue', label: 'À payer' },
  partiel: { tone: 'amber', label: 'Partiellement payé' },
  urgent: { tone: 'red', label: 'Urgent' },
  paye: { tone: 'green', label: 'Payé' },
}

export default function SupplierDebts() {
  const { notify } = useApp()
  const [payFor, setPayFor] = useState(null)

  const totalDue = supplierDebts.reduce((s, d) => s + remaining(d), 0)
  const nbUrgent = supplierDebts.filter((d) => d.status === 'urgent').length

  return (
    <div>
      <PageHeader title="Dettes fournisseurs" subtitle="Marchandises à régler" icon={ReceiptText} />

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 mb-5">
        <StatCard label="Total à payer" value={ariary(totalDue)} icon={ReceiptText} tone="rose" />
        <StatCard label="Échéances urgentes" value={nbUrgent} icon={AlertTriangle} tone="orange" />
        <StatCard label="Nombre de factures" value={supplierDebts.length} icon={Wallet} tone="slate" />
      </div>

      <SectionCard bodyClass="p-0">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead><tr>
              <th className="th">Fournisseur</th><th className="th">N° facture</th><th className="th text-right">Montant total</th>
              <th className="th text-right">Payé</th><th className="th text-right">Reste à payer</th>
              <th className="th w-40">Progression</th><th className="th">Échéance</th><th className="th">Statut</th><th className="th"></th>
            </tr></thead>
            <tbody className="divide-y divide-slate-100">
              {supplierDebts.map((d) => {
                const rest = remaining(d)
                const pct = Math.round((d.paid / d.total) * 100)
                const dleft = daysUntil(d.due)
                const si = statusInfo[d.status]
                return (
                  <tr key={d.id} className="hover:bg-slate-50">
                    <td className="td font-semibold text-slate-800">{supplierName(d.supplierId)}</td>
                    <td className="td text-brand-700">{d.invoice}</td>
                    <td className="td text-right tabular-nums">{ariary(d.total)}</td>
                    <td className="td text-right tabular-nums text-emerald-600">{ariary(d.paid)}</td>
                    <td className="td text-right tabular-nums font-semibold text-rose-600">{ariary(rest)}</td>
                    <td className="td"><Progress value={pct} tone={pct >= 100 ? 'brand' : 'amber'} /><span className="mt-1 block text-[11px] text-slate-400">{pct}%</span></td>
                    <td className="td">
                      <span className="inline-flex items-center gap-1.5">
                        <CalendarClock size={14} className={dleft <= 3 ? 'text-rose-500' : 'text-slate-400'} />
                        <span className={dleft <= 3 ? 'font-semibold text-rose-600' : 'text-slate-500'}>{frDate(d.due)}</span>
                        {dleft <= 3 && dleft >= 0 && <Badge tone="red">J−{dleft}</Badge>}
                      </span>
                    </td>
                    <td className="td"><Badge tone={si.tone} dot>{si.label}</Badge></td>
                    <td className="td"><button className="btn-ghost px-2 py-1 text-xs" onClick={() => setPayFor(d)}>Payer</button></td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </SectionCard>

      <Modal open={!!payFor} onClose={() => setPayFor(null)} title="Payer un fournisseur" subtitle={payFor ? `${supplierName(payFor.supplierId)} · ${payFor.invoice}` : ''} icon={Wallet}
        footer={<>
          <button className="btn-secondary" onClick={() => setPayFor(null)}>Annuler</button>
          <button className="btn-primary" onClick={() => { setPayFor(null); notify('Paiement fournisseur enregistré (simulation).', { type: 'success' }) }}>Valider le paiement</button>
        </>}>
        {payFor && (
          <div className="space-y-4">
            <div className="rounded-lg bg-slate-50 p-3 text-sm">
              <div className="flex justify-between"><span className="text-slate-500">Reste à payer</span><span className="font-bold text-rose-600">{ariary(remaining(payFor))}</span></div>
            </div>
            <div><label className="label">Montant payé (Ar)</label><input type="number" className="input" placeholder="0" /></div>
            <div><label className="label">Mode</label><select className="input"><option>Espèces</option><option>Virement</option><option>Mobile Money</option></select></div>
          </div>
        )}
      </Modal>
    </div>
  )
}
