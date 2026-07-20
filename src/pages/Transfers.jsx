import { useState } from 'react'
import { ArrowLeftRight, ArrowRight, Check } from 'lucide-react'
import { PageHeader, SectionCard, Badge } from '../components/ui'
import { useApp } from '../context/AppContext'
import { transfers as initialTransfers } from '../data/transfers'
import { products, productById } from '../data/products'
import { frDateTime } from '../data/formatters'

export default function Transfers() {
  const { notify, currentUser } = useApp()
  const [list, setList] = useState(initialTransfers)
  const [form, setForm] = useState({ from: 'B', to: 'A', productId: products[0].id, qty: '', unitIdx: 0, reason: '', responsible: currentUser?.name || '' })

  const product = productById(form.productId)
  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }))

  const submit = () => {
    if (form.from === form.to) return notify('Le dépôt de départ et d’arrivée doivent être différents.', { type: 'warning' })
    if (!form.qty || Number(form.qty) <= 0) return notify('Quantité invalide.', { type: 'warning' })
    const entry = {
      id: 't' + Date.now(), date: new Date().toISOString(), productId: form.productId,
      from: form.from, to: form.to, qty: Number(form.qty), unit: product.units[form.unitIdx].label,
      reason: form.reason || '—', responsible: form.responsible || currentUser?.name, status: 'en_cours',
    }
    setList((l) => [entry, ...l])
    notify(`Transfert enregistré : ${product.name} du Dépôt ${form.from} vers ${form.to}.`, { type: 'success', title: 'Transfert effectué' })
    setForm((f) => ({ ...f, qty: '', reason: '' }))
  }

  return (
    <div>
      <PageHeader title="Transferts" subtitle="Déplacement de marchandises entre dépôts" icon={ArrowLeftRight} />

      <div className="grid gap-4 lg:grid-cols-3">
        <SectionCard title="Nouveau transfert" bodyClass="p-5 space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div><label className="label">Dépôt de départ</label>
              <select className="input" value={form.from} onChange={(e) => set('from', e.target.value)}><option value="A">Dépôt A</option><option value="B">Dépôt B</option></select></div>
            <div><label className="label">Dépôt d'arrivée</label>
              <select className="input" value={form.to} onChange={(e) => set('to', e.target.value)}><option value="A">Dépôt A</option><option value="B">Dépôt B</option></select></div>
          </div>
          <div className="flex items-center justify-center gap-2 text-sm font-semibold text-brand-600">
            <Badge tone="slate">Dépôt {form.from}</Badge><ArrowRight size={16} /><Badge tone="green">Dépôt {form.to}</Badge>
          </div>
          <div><label className="label">Produit</label>
            <select className="input" value={form.productId} onChange={(e) => { set('productId', e.target.value); set('unitIdx', 0) }}>
              {products.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}
            </select></div>
          <div className="grid grid-cols-2 gap-3">
            <div><label className="label">Quantité</label><input type="number" min="0" className="input" value={form.qty} onChange={(e) => set('qty', e.target.value)} /></div>
            <div><label className="label">Unité</label>
              <select className="input" value={form.unitIdx} onChange={(e) => set('unitIdx', Number(e.target.value))}>
                {product.units.map((u, i) => <option key={i} value={i}>{u.label}</option>)}
              </select></div>
          </div>
          <div><label className="label">Motif</label><input className="input" placeholder="Ex : rupture au Dépôt A" value={form.reason} onChange={(e) => set('reason', e.target.value)} /></div>
          <div><label className="label">Responsable</label><input className="input" value={form.responsible} onChange={(e) => set('responsible', e.target.value)} /></div>
          <button className="btn-primary w-full" onClick={submit}><Check size={17} /> Valider le transfert</button>
        </SectionCard>

        <SectionCard title="Historique des transferts" subtitle={`${list.length} transferts`} className="lg:col-span-2" bodyClass="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead><tr>
                <th className="th">Date</th><th className="th">Produit</th><th className="th">Trajet</th>
                <th className="th text-right">Quantité</th><th className="th">Motif</th><th className="th">Responsable</th><th className="th">Statut</th>
              </tr></thead>
              <tbody className="divide-y divide-slate-100">
                {list.map((t) => (
                  <tr key={t.id} className="hover:bg-slate-50">
                    <td className="td text-slate-500">{frDateTime(t.date)}</td>
                    <td className="td font-medium text-slate-800">{productById(t.productId)?.name}</td>
                    <td className="td"><span className="inline-flex items-center gap-1"><Badge tone="slate">{t.from}</Badge><ArrowRight size={13} className="text-slate-400" /><Badge tone="green">{t.to}</Badge></span></td>
                    <td className="td text-right tabular-nums">{t.qty} <span className="text-xs text-slate-400">{t.unit}</span></td>
                    <td className="td text-slate-500 max-w-[180px] truncate">{t.reason}</td>
                    <td className="td text-slate-500">{t.responsible}</td>
                    <td className="td">{t.status === 'valide' ? <Badge tone="green" dot>Validé</Badge> : <Badge tone="amber" dot>En cours</Badge>}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </SectionCard>
      </div>
    </div>
  )
}
