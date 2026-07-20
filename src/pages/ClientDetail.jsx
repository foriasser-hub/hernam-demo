import { useState } from 'react'
import { ArrowLeft, Phone, ShoppingCart, HandCoins, ReceiptText, Wallet, CalendarClock, Percent } from 'lucide-react'
import { SectionCard, Badge, Avatar, EmptyState } from '../components/ui'
import Modal from '../components/Modal'
import { useApp } from '../context/AppContext'
import { clientById } from '../data/clients'
import { sales, paymentInfo } from '../data/sales'
import { clientDebts, remaining } from '../data/debts'
import { ariary, frDate, frDateTime } from '../data/formatters'

export default function ClientDetail() {
  const { route, navigate, notify } = useApp()
  const client = clientById(route.params?.id)
  const [payOpen, setPayOpen] = useState(false)

  if (!client) return <EmptyState icon={ReceiptText} title="Client introuvable" text="Ce client n'existe pas dans la maquette." />

  const clientSales = sales.filter((s) => s.clientId === client.id)
  const debts = clientDebts.filter((d) => d.clientId === client.id)
  const totalDue = debts.reduce((s, d) => s + remaining(d), 0)
  const totalPaid = clientSales.reduce((s, x) => s + x.paid, 0)

  return (
    <div>
      <button onClick={() => navigate('clients')} className="mb-4 inline-flex items-center gap-1.5 text-sm font-semibold text-slate-500 hover:text-slate-800">
        <ArrowLeft size={16} /> Retour aux clients
      </button>

      <div className="card p-5 mb-4">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="flex items-center gap-4">
            <Avatar name={client.name} size="lg" tone="blue" />
            <div>
              <h1 className="text-xl font-bold text-slate-900">{client.name}</h1>
              <div className="mt-1 flex flex-wrap items-center gap-2 text-sm text-slate-500">
                <span className="inline-flex items-center gap-1"><Phone size={14} /> {client.phone}</span>
                <Badge tone="slate">{client.type}</Badge>
                {client.status === 'retard' ? <Badge tone="red" dot>En retard</Badge> : <Badge tone="green" dot>À jour</Badge>}
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <button className="btn-secondary" onClick={() => setPayOpen(true)}><Wallet size={16} /> Enregistrer un paiement</button>
            <button className="btn-primary" onClick={() => navigate('new-sale')}><ShoppingCart size={16} /> Nouvelle vente</button>
          </div>
        </div>

        <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
          <Metric icon={ShoppingCart} label="Total des achats" value={ariary(client.totalPurchases)} tone="brand" />
          <Metric icon={Wallet} label="Total payé" value={ariary(totalPaid)} tone="emerald" />
          <Metric icon={HandCoins} label="Reste à payer" value={ariary(totalDue)} tone="rose" />
          <Metric icon={Percent} label="Remise autorisée" value={`${client.allowedDiscount} %`} tone="amber" />
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <SectionCard title="Historique des ventes" icon={ReceiptText} className="lg:col-span-2" bodyClass="p-0">
          {clientSales.length === 0 ? (
            <p className="py-10 text-center text-sm text-slate-400">Aucune vente enregistrée.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead><tr>
                  <th className="th">Facture</th><th className="th">Date</th><th className="th">Paiement</th>
                  <th className="th text-right">Montant</th><th className="th text-right">Payé</th>
                </tr></thead>
                <tbody className="divide-y divide-slate-100">
                  {clientSales.map((s) => {
                    const pi = paymentInfo(s.payment)
                    return (
                      <tr key={s.id} className="cursor-pointer hover:bg-slate-50" onClick={() => navigate('invoice', { id: s.id })}>
                        <td className="td font-medium text-brand-700">{s.id}</td>
                        <td className="td text-slate-500">{frDate(s.date)}</td>
                        <td className="td"><Badge tone={pi.tone}>{pi.label}</Badge></td>
                        <td className="td text-right font-semibold tabular-nums">{ariary(s.total)}</td>
                        <td className="td text-right tabular-nums">{ariary(s.paid)}</td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          )}
        </SectionCard>

        <SectionCard title="Dettes & échéances" icon={CalendarClock} bodyClass="p-4 space-y-3">
          {debts.length === 0 && <p className="py-6 text-center text-sm text-slate-400">Aucune dette en cours.</p>}
          {debts.map((d) => (
            <div key={d.id} className="rounded-xl border border-slate-200 p-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-slate-700">{d.invoice}</span>
                <Badge tone={d.status === 'retard' ? 'red' : d.status === 'partiel' ? 'amber' : 'blue'}>
                  {d.status === 'retard' ? 'En retard' : d.status === 'partiel' ? 'Partiel' : 'En cours'}
                </Badge>
              </div>
              <div className="mt-2 flex justify-between text-sm">
                <span className="text-slate-500">Reste à payer</span>
                <span className="font-bold text-rose-600 tabular-nums">{ariary(remaining(d))}</span>
              </div>
              <p className="mt-1 text-xs text-slate-400">Échéance : {frDate(d.due)}</p>
            </div>
          ))}
        </SectionCard>
      </div>

      <Modal open={payOpen} onClose={() => setPayOpen(false)} title="Enregistrer un paiement" subtitle={client.name} icon={Wallet}
        footer={<>
          <button className="btn-secondary" onClick={() => setPayOpen(false)}>Annuler</button>
          <button className="btn-primary" onClick={() => { setPayOpen(false); notify('Paiement enregistré (simulation).', { type: 'success' }) }}>Valider le paiement</button>
        </>}>
        <div className="grid gap-4 sm:grid-cols-2">
          <div><label className="label">Montant (Ar)</label><input type="number" className="input" placeholder="0" /></div>
          <div><label className="label">Mode</label><select className="input"><option>Espèces</option><option>Mobile Money</option></select></div>
          <div className="sm:col-span-2"><label className="label">Facture concernée</label>
            <select className="input"><option>Toutes les dettes</option>{debts.map((d) => <option key={d.id}>{d.invoice}</option>)}</select>
          </div>
        </div>
      </Modal>
    </div>
  )
}

function Metric({ icon: Icon, label, value, tone }) {
  const tones = { brand: 'text-brand-600 bg-brand-50', emerald: 'text-emerald-600 bg-emerald-50', rose: 'text-rose-600 bg-rose-50', amber: 'text-amber-600 bg-amber-50' }
  return (
    <div className="rounded-xl bg-slate-50 p-3">
      <span className={`mb-2 flex h-8 w-8 items-center justify-center rounded-lg ${tones[tone]}`}><Icon size={16} /></span>
      <p className="text-sm font-extrabold text-slate-800 tabular-nums">{value}</p>
      <p className="text-xs text-slate-500">{label}</p>
    </div>
  )
}
