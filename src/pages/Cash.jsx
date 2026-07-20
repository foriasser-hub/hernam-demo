import { useState } from 'react'
import { Wallet, ArrowDownCircle, ArrowUpCircle, Lock, Smartphone } from 'lucide-react'
import { PageHeader, SectionCard, Badge } from '../components/ui'
import { useApp } from '../context/AppContext'
import { ariary } from '../data/formatters'

// Valeurs de caisse du jour (fictives)
const opening = 500000
const salesCash = 2985000
const salesMobile = 1971000
const clientPayments = 880000
const expensesOut = 470000
const supplierPayments = 5000000

const theoretical = opening + salesCash + clientPayments - expensesOut - supplierPayments

export default function Cash() {
  const { notify } = useApp()
  const [real, setReal] = useState(theoretical - 15000)
  const diff = Number(real) - theoretical

  const lines = [
    { label: "Solde d'ouverture", value: opening, type: 'in', icon: Wallet },
    { label: 'Ventes en espèces', value: salesCash, type: 'in', icon: ArrowDownCircle },
    { label: 'Paiements clients (dettes)', value: clientPayments, type: 'in', icon: ArrowDownCircle },
    { label: 'Dépenses', value: -expensesOut, type: 'out', icon: ArrowUpCircle },
    { label: 'Paiements fournisseurs', value: -supplierPayments, type: 'out', icon: ArrowUpCircle },
  ]

  return (
    <div>
      <PageHeader title="Caisse" subtitle="Journée du 20 juillet 2026 — Dépôt A" icon={Wallet}
        actions={<button className="btn-primary" onClick={() => notify('Caisse clôturée pour la journée (simulation).', { type: 'success', title: 'Clôture effectuée' })}><Lock size={16} /> Clôturer la caisse</button>} />

      <div className="grid gap-4 lg:grid-cols-3">
        {/* Mouvements */}
        <SectionCard title="Mouvements de caisse" className="lg:col-span-2" bodyClass="p-4">
          <div className="space-y-2">
            {lines.map((l) => {
              const Icon = l.icon
              return (
                <div key={l.label} className="flex items-center gap-3 rounded-xl border border-slate-100 p-3">
                  <span className={`flex h-9 w-9 items-center justify-center rounded-lg ${l.type === 'in' ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}><Icon size={18} /></span>
                  <span className="flex-1 text-sm font-medium text-slate-700">{l.label}</span>
                  <span className={`font-semibold tabular-nums ${l.value < 0 ? 'text-rose-600' : 'text-slate-800'}`}>{l.value < 0 ? '− ' : '+ '}{ariary(Math.abs(l.value))}</span>
                </div>
              )
            })}
          </div>
          <div className="mt-3 flex items-center justify-between rounded-xl bg-brand-50 p-3">
            <span className="font-bold text-brand-700">Solde théorique</span>
            <span className="text-lg font-extrabold text-brand-700 tabular-nums">{ariary(theoretical)}</span>
          </div>
          <div className="mt-3 flex items-center gap-3 rounded-xl border border-blue-100 bg-blue-50/50 p-3">
            <Smartphone size={18} className="text-blue-500" />
            <span className="flex-1 text-sm text-slate-600">Ventes Mobile Money (hors caisse espèces)</span>
            <span className="font-semibold text-blue-700 tabular-nums">{ariary(salesMobile)}</span>
          </div>
        </SectionCard>

        {/* Contrôle */}
        <SectionCard title="Contrôle de caisse" bodyClass="p-5 space-y-4">
          <div>
            <label className="label">Solde théorique</label>
            <div className="input bg-slate-50 tabular-nums">{ariary(theoretical)}</div>
          </div>
          <div>
            <label className="label">Solde réel compté (Ar)</label>
            <input type="number" className="input" value={real} onChange={(e) => setReal(e.target.value)} />
          </div>
          <div className={`rounded-xl p-4 text-center ${diff === 0 ? 'bg-emerald-50' : 'bg-rose-50'}`}>
            <p className="text-xs font-semibold uppercase text-slate-500">Différence</p>
            <p className={`text-2xl font-extrabold tabular-nums ${diff === 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
              {diff > 0 ? '+ ' : diff < 0 ? '− ' : ''}{ariary(Math.abs(diff))}
            </p>
            <div className="mt-1">
              {diff === 0 ? <Badge tone="green" dot>Caisse équilibrée</Badge> : <Badge tone="red" dot>Écart détecté</Badge>}
            </div>
          </div>
        </SectionCard>
      </div>
    </div>
  )
}
