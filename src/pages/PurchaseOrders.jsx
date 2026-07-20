import { useState } from 'react'
import { ClipboardList, Plus, Eye, ArrowRight } from 'lucide-react'
import { PageHeader, SectionCard, Badge } from '../components/ui'
import Modal from '../components/Modal'
import { useApp } from '../context/AppContext'
import { purchaseOrders, poStatusInfo } from '../data/purchaseOrders'
import { productById } from '../data/products'
import { clientName } from '../data/clients'
import { ariary, frDate } from '../data/formatters'

export default function PurchaseOrders() {
  const { notify } = useApp()
  const [detail, setDetail] = useState(null)
  const [filter, setFilter] = useState('all')

  const rows = purchaseOrders.filter((o) => filter === 'all' || o.status === filter)

  return (
    <div>
      <PageHeader title="Bons de commande" subtitle={`${purchaseOrders.length} bons`} icon={ClipboardList}
        actions={<button className="btn-primary" onClick={() => notify('Nouveau bon de commande (simulation).', { type: 'success' })}><Plus size={16} /> Nouveau bon</button>} />

      <SectionCard bodyClass="p-0">
        <div className="flex flex-wrap items-center gap-2 border-b border-slate-100 p-4">
          {['all', 'attente', 'prepare', 'livre', 'annule'].map((f) => (
            <button key={f} onClick={() => setFilter(f)}
              className={`rounded-lg px-3 py-1.5 text-sm font-semibold transition ${filter === f ? 'bg-brand-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}>
              {f === 'all' ? 'Tous' : poStatusInfo(f).label}
            </button>
          ))}
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead><tr>
              <th className="th">N° Bon</th><th className="th">Date</th><th className="th">Client</th>
              <th className="th text-right">Articles</th><th className="th text-right">Montant estimatif</th><th className="th">Statut</th><th className="th"></th>
            </tr></thead>
            <tbody className="divide-y divide-slate-100">
              {rows.map((o) => {
                const si = poStatusInfo(o.status)
                return (
                  <tr key={o.id} className="cursor-pointer hover:bg-slate-50" onClick={() => setDetail(o)}>
                    <td className="td font-semibold text-brand-700">{o.id}</td>
                    <td className="td text-slate-500">{frDate(o.date)}</td>
                    <td className="td font-medium text-slate-800">{clientName(o.clientId)}</td>
                    <td className="td text-right tabular-nums text-slate-500">{o.items.length}</td>
                    <td className="td text-right font-semibold tabular-nums">{ariary(o.estimate)}</td>
                    <td className="td"><Badge tone={si.tone} dot>{si.label}</Badge></td>
                    <td className="td text-slate-400"><Eye size={16} /></td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </SectionCard>

      <Modal open={!!detail} onClose={() => setDetail(null)} title={detail?.id} subtitle={detail ? clientName(detail.clientId) : ''} icon={ClipboardList}
        footer={<>
          <button className="btn-secondary" onClick={() => setDetail(null)}>Fermer</button>
          <button className="btn-primary" onClick={() => { setDetail(null); notify('Bon converti en vente (simulation).', { type: 'success' }) }}>Convertir en vente <ArrowRight size={15} /></button>
        </>}>
        {detail && (
          <div>
            <div className="mb-3 flex items-center justify-between">
              <Badge tone={poStatusInfo(detail.status).tone} dot>{poStatusInfo(detail.status).label}</Badge>
              <span className="text-sm text-slate-500">{frDate(detail.date)}</span>
            </div>
            <div className="overflow-hidden rounded-lg border border-slate-200">
              <table className="w-full text-sm">
                <thead><tr><th className="th">Produit</th><th className="th">Unité</th><th className="th text-right">Qté</th><th className="th text-right">Prix</th><th className="th text-right">Total</th></tr></thead>
                <tbody className="divide-y divide-slate-100">
                  {detail.items.map((it, i) => (
                    <tr key={i}>
                      <td className="td font-medium text-slate-700">{productById(it.productId)?.name}</td>
                      <td className="td text-slate-500">{it.unit}</td>
                      <td className="td text-right tabular-nums">{it.qty}</td>
                      <td className="td text-right tabular-nums">{ariary(it.price)}</td>
                      <td className="td text-right font-semibold tabular-nums">{ariary(it.qty * it.price)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-3 flex justify-between border-t border-slate-100 pt-3 text-base font-extrabold text-slate-900">
              <span>Montant estimatif</span><span className="tabular-nums">{ariary(detail.estimate)}</span>
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}
