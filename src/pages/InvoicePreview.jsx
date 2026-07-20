import { ArrowLeft, Printer, Download, Send } from 'lucide-react'
import { Badge } from '../components/ui'
import { useApp } from '../context/AppContext'
import { sales, paymentInfo } from '../data/sales'
import { productById } from '../data/products'
import { clientName } from '../data/clients'
import { company } from '../data/company'
import { ariary, frDate } from '../data/formatters'

export default function InvoicePreview() {
  const { route, navigate, notify } = useApp()
  const sale = route.params?.sale || sales.find((s) => s.id === route.params?.id) || sales[0]
  const pi = paymentInfo(sale.payment)
  const subtotal = sale.items.reduce((s, i) => s + i.qty * i.price, 0)
  const reste = Math.max(0, sale.total - sale.paid)

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <button onClick={() => navigate('invoices')} className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-500 hover:text-slate-800">
          <ArrowLeft size={16} /> Retour aux factures
        </button>
        <div className="flex gap-2">
          <button className="btn-secondary" onClick={() => notify('Impression simulée.', { type: 'info' })}><Printer size={16} /> Imprimer</button>
          <button className="btn-secondary" onClick={() => notify('Téléchargement PDF simulé.', { type: 'success' })}><Download size={16} /> PDF</button>
          <button className="btn-primary" onClick={() => notify('Facture envoyée par SMS / e-mail (simulation).', { type: 'success' })}><Send size={16} /> Envoyer</button>
        </div>
      </div>

      {/* Feuille A5 */}
      <div className="mx-auto max-w-2xl">
        <div className="card overflow-hidden">
          {/* Bandeau haut */}
          <div className="border-b-2 border-brand-600 bg-slate-50 p-6">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <img src="/logo.svg" alt="Logo" className="h-14 w-14 rounded-xl" />
                <div>
                  <p className="text-lg font-extrabold text-slate-900">{company.name}</p>
                  <p className="text-xs text-slate-500">{company.slogan}</p>
                  <p className="mt-1 text-[11px] leading-tight text-slate-500">{company.address}</p>
                  <p className="text-[11px] text-slate-500">Tél : {company.phone}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-2xl font-extrabold tracking-tight text-brand-700">FACTURE</p>
                <p className="text-sm font-semibold text-slate-700">{sale.id}{sale.draft && ' (brouillon)'}</p>
                <p className="text-xs text-slate-500">{frDate(sale.date)}</p>
                <div className="mt-2 flex flex-col items-end gap-0.5 text-[10px] text-slate-400">
                  <span>{company.nif}</span><span>{company.stat}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Client */}
          <div className="flex flex-wrap items-center justify-between gap-3 px-6 py-4">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wide text-slate-400">Facturé à</p>
              <p className="font-semibold text-slate-800">{clientName(sale.clientId)}</p>
            </div>
            <div className="text-right">
              <p className="text-[10px] font-bold uppercase tracking-wide text-slate-400">Paiement</p>
              <Badge tone={pi.tone}>{pi.label}</Badge>
            </div>
          </div>

          {/* Lignes */}
          <div className="px-6">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-y border-slate-200">
                  <th className="py-2 text-left text-[11px] font-bold uppercase text-slate-400">Produit</th>
                  <th className="py-2 text-left text-[11px] font-bold uppercase text-slate-400">Unité</th>
                  <th className="py-2 text-right text-[11px] font-bold uppercase text-slate-400">Qté</th>
                  <th className="py-2 text-right text-[11px] font-bold uppercase text-slate-400">P.U.</th>
                  <th className="py-2 text-right text-[11px] font-bold uppercase text-slate-400">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {sale.items.map((it, i) => (
                  <tr key={i}>
                    <td className="py-2.5 font-medium text-slate-700">{productById(it.productId)?.name || '—'}</td>
                    <td className="py-2.5 text-slate-500">{it.unit}</td>
                    <td className="py-2.5 text-right tabular-nums">{it.qty}</td>
                    <td className="py-2.5 text-right tabular-nums">{ariary(it.price)}</td>
                    <td className="py-2.5 text-right font-semibold tabular-nums">{ariary(it.qty * it.price)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Totaux */}
          <div className="flex justify-end px-6 py-4">
            <div className="w-full max-w-xs space-y-1.5 text-sm">
              <div className="flex justify-between text-slate-500"><span>Sous-total</span><span className="tabular-nums">{ariary(subtotal)}</span></div>
              <div className="flex justify-between text-slate-500"><span>Remise</span><span className="tabular-nums">− {ariary(sale.discount || 0)}</span></div>
              <div className="flex justify-between border-t border-slate-200 pt-1.5 text-base font-extrabold text-slate-900"><span>Total à payer</span><span className="tabular-nums">{ariary(sale.total)}</span></div>
              <div className="flex justify-between text-emerald-600"><span>Montant payé</span><span className="tabular-nums">{ariary(sale.paid)}</span></div>
              <div className="flex justify-between font-semibold text-rose-600"><span>Reste à payer</span><span className="tabular-nums">{ariary(reste)}</span></div>
            </div>
          </div>

          {/* Pied */}
          <div className="flex items-end justify-between gap-4 border-t border-slate-100 bg-slate-50 px-6 py-4">
            <div className="text-[11px] text-slate-500">
              <p>Vendeur : <span className="font-semibold text-slate-700">{sale.seller}</span></p>
              <p className="mt-1">Merci de votre confiance — {company.name}</p>
            </div>
            <div className="text-center">
              <div className="h-12 w-32 border-b border-dashed border-slate-300" />
              <p className="mt-1 text-[10px] text-slate-400">Signature & cachet</p>
            </div>
          </div>
        </div>
        <p className="mt-3 text-center text-xs text-slate-400">Format A5 — aperçu maquette. Les actions d'impression et d'envoi sont simulées.</p>
      </div>
    </div>
  )
}
