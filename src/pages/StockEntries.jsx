import { useState } from 'react'
import { PackagePlus, Plus } from 'lucide-react'
import { PageHeader, SectionCard, Badge } from '../components/ui'
import Modal from '../components/Modal'
import { useApp } from '../context/AppContext'
import { stockEntries } from '../data/stockEntries'
import { products } from '../data/products'
import { suppliers, supplierName } from '../data/suppliers'
import { productById } from '../data/products'
import { ariary, frDate } from '../data/formatters'

const payBadge = (p) => (p === 'comptant' ? <Badge tone="green">Comptant</Badge> : p === 'partiel' ? <Badge tone="amber">Partiel</Badge> : <Badge tone="red">Crédit</Badge>)

export default function StockEntries() {
  const { notify } = useApp()
  const [addOpen, setAddOpen] = useState(false)

  return (
    <div>
      <PageHeader title="Entrées de stock" subtitle="Réceptions de marchandises fournisseurs" icon={PackagePlus}
        actions={<button className="btn-primary" onClick={() => setAddOpen(true)}><Plus size={16} /> Nouvelle entrée</button>} />

      <SectionCard bodyClass="p-0">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead><tr>
              <th className="th">Date</th><th className="th">Facture</th><th className="th">Fournisseur</th><th className="th">Produit</th>
              <th className="th">Dépôt</th><th className="th text-right">Qté</th><th className="th text-right">Prix achat</th>
              <th className="th">Paiement</th><th className="th text-right">Reste</th><th className="th">Échéance</th>
            </tr></thead>
            <tbody className="divide-y divide-slate-100">
              {stockEntries.map((e) => {
                const totalLine = e.qty * e.purchasePrice
                const reste = Math.max(0, totalLine - e.paid)
                return (
                  <tr key={e.id} className="hover:bg-slate-50">
                    <td className="td text-slate-500">{frDate(e.date)}</td>
                    <td className="td font-semibold text-brand-700">{e.invoice}</td>
                    <td className="td text-slate-600">{supplierName(e.supplierId)}</td>
                    <td className="td font-medium text-slate-800">{productById(e.productId)?.name}</td>
                    <td className="td"><Badge tone="slate">Dépôt {e.depot}</Badge></td>
                    <td className="td text-right tabular-nums">{e.qty} <span className="text-xs text-slate-400">{e.unit}</span></td>
                    <td className="td text-right tabular-nums">{ariary(e.purchasePrice)}</td>
                    <td className="td">{payBadge(e.payment)}</td>
                    <td className={`td text-right tabular-nums ${reste > 0 ? 'text-rose-600 font-semibold' : 'text-slate-400'}`}>{reste > 0 ? ariary(reste) : '—'}</td>
                    <td className="td text-slate-500">{e.due ? frDate(e.due) : '—'}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </SectionCard>

      <Modal open={addOpen} onClose={() => setAddOpen(false)} title="Nouvelle entrée de stock" icon={PackagePlus} size="lg"
        footer={<>
          <button className="btn-secondary" onClick={() => setAddOpen(false)}>Annuler</button>
          <button className="btn-primary" onClick={() => { setAddOpen(false); notify('Entrée de stock enregistrée (simulation).', { type: 'success' }) }}>Enregistrer l'entrée</button>
        </>}>
        <div className="grid gap-4 sm:grid-cols-2">
          <div><label className="label">Fournisseur</label><select className="input">{suppliers.map((s) => <option key={s.id}>{s.name}</option>)}</select></div>
          <div><label className="label">Dépôt</label><select className="input"><option>Dépôt A</option><option>Dépôt B</option></select></div>
          <div><label className="label">N° facture d'achat</label><input className="input" placeholder="ACH-…" /></div>
          <div><label className="label">Produit</label><select className="input">{products.map((p) => <option key={p.id}>{p.name}</option>)}</select></div>
          <div><label className="label">Quantité</label><input type="number" className="input" placeholder="0" /></div>
          <div><label className="label">Unité</label><select className="input"><option>Sac</option><option>Carton</option><option>Bidon</option><option>Kg</option><option>Pièce</option></select></div>
          <div><label className="label">Prix d'achat (Ar)</label><input type="number" className="input" placeholder="0" /></div>
          <div><label className="label">Paiement</label><select className="input"><option>Comptant</option><option>Crédit</option><option>Partiel</option></select></div>
          <div><label className="label">Montant payé (Ar)</label><input type="number" className="input" placeholder="0" /></div>
          <div><label className="label">Échéance</label><input type="date" className="input" /></div>
          <div><label className="label">Frais de transport (Ar)</label><input type="number" className="input" placeholder="0" /></div>
          <div><label className="label">Frais de dockers (Ar)</label><input type="number" className="input" placeholder="0" /></div>
          <div className="sm:col-span-2"><label className="label">Observations</label><input className="input" placeholder="Remarques sur la réception…" /></div>
        </div>
      </Modal>
    </div>
  )
}
