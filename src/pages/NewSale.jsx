import { useState, useMemo } from 'react'
import {
  ShoppingCart, Search, Plus, Trash2, Printer, FileText, X, Check, Lock, ArrowRight, ShieldAlert,
} from 'lucide-react'
import { PageHeader, SectionCard, Badge } from '../components/ui'
import Modal from '../components/Modal'
import { useApp } from '../context/AppContext'
import { products, productById, fmtQty } from '../data/products'
import { clients } from '../data/clients'
import { ariary } from '../data/formatters'

const suggestedPrice = (p, unit) => Math.round((unit.tier === 'gros' ? p.wholesalePrice : p.retailPrice) * unit.factor)

export default function NewSale() {
  const { isAdmin, currentUser, notify, navigate } = useApp()

  const [clientId, setClientId] = useState('comptant')
  const [depot, setDepot] = useState('A')
  const [search, setSearch] = useState('')
  const [pickerOpen, setPickerOpen] = useState(false)
  const [productId, setProductId] = useState(null)
  const [unitIdx, setUnitIdx] = useState(0)
  const [qty, setQty] = useState(1)
  const [price, setPrice] = useState(0)
  const [discount, setDiscount] = useState(0)

  const [cart, setCart] = useState([])
  const [payment, setPayment] = useState('especes')
  const [paid, setPaid] = useState(0)

  const [authModal, setAuthModal] = useState(false)
  const [doneModal, setDoneModal] = useState(false)

  const product = productId ? productById(productId) : null
  const unit = product ? product.units[unitIdx] : null
  const filtered = useMemo(
    () => products.filter((p) => p.name.toLowerCase().includes(search.toLowerCase())),
    [search],
  )

  const selectProduct = (p) => {
    setProductId(p.id)
    setUnitIdx(0)
    setPrice(suggestedPrice(p, p.units[0]))
    setQty(1)
    setDiscount(0)
    setSearch(p.name)
    setPickerOpen(false)
  }
  const changeUnit = (idx) => {
    setUnitIdx(idx)
    if (product) setPrice(suggestedPrice(product, product.units[idx]))
  }

  const baseAmount = product && unit ? unit.factor * (Number(qty) || 0) : 0
  const depotStock = product ? (depot === 'A' ? product.stockA : product.stockB) : 0
  const lineTotal = Math.max(0, (Number(qty) || 0) * (Number(price) || 0) - (Number(discount) || 0))

  const tryDiscount = () => { if (!isAdmin) setAuthModal(true) }

  const addToCart = () => {
    if (!product) return notify('Sélectionnez un produit.', { type: 'warning' })
    if ((Number(qty) || 0) <= 0) return notify('Quantité invalide.', { type: 'warning' })
    if ((Number(discount) || 0) > 0 && !isAdmin) return setAuthModal(true)
    setCart((c) => [
      ...c,
      {
        key: Math.random().toString(36).slice(2),
        productId: product.id, name: product.name,
        unitLabel: unit.label, factor: unit.factor, baseUnit: product.baseUnit,
        qty: Number(qty), price: Number(price), discount: Number(discount) || 0,
        depot, total: lineTotal, baseAmount,
      },
    ])
    notify(`${product.name} ajouté au panier.`, { type: 'success' })
    setProductId(null); setSearch(''); setQty(1); setPrice(0); setDiscount(0)
  }

  const removeLine = (key) => setCart((c) => c.filter((l) => l.key !== key))

  const subtotal = cart.reduce((s, l) => s + l.qty * l.price, 0)
  const totalDiscount = cart.reduce((s, l) => s + l.discount, 0)
  const grandTotal = subtotal - totalDiscount
  const paidNow = payment === 'credit' ? 0 : payment === 'partiel' ? Number(paid) || 0 : grandTotal
  const remainingDue = Math.max(0, grandTotal - paidNow)

  const buildSale = () => ({
    id: 'FAC-2026-0211',
    draft: true,
    date: new Date().toISOString(),
    clientId, seller: currentUser?.name, depot, payment,
    total: grandTotal, paid: paidNow, discount: totalDiscount,
    items: cart.map((l) => ({ productId: l.productId, unit: l.unitLabel, qty: l.qty, price: l.price })),
  })

  const validate = () => {
    if (cart.length === 0) return notify('Le panier est vide.', { type: 'warning' })
    setDoneModal(true)
  }
  const printInvoice = () => {
    if (cart.length === 0) return notify('Le panier est vide.', { type: 'warning' })
    navigate('invoice', { sale: buildSale() })
  }
  const genPO = () => {
    if (cart.length === 0) return notify('Le panier est vide.', { type: 'warning' })
    notify('Bon de commande généré (simulation).', { type: 'success', title: 'BC-2026-046' })
    navigate('purchase-orders')
  }
  const cancelSale = () => { setCart([]); setProductId(null); setSearch(''); notify('Vente annulée.', { type: 'info' }) }
  const finishSale = () => {
    setDoneModal(false)
    setCart([]); setProductId(null); setSearch(''); setPaid(0); setPayment('especes')
    notify('Vente enregistrée avec succès.', { type: 'success', title: 'FAC-2026-0211' })
  }

  const payOptions = [
    { id: 'especes', label: 'Espèces' },
    { id: 'mobile', label: 'Mobile Money' },
    { id: 'credit', label: 'Crédit' },
    { id: 'partiel', label: 'Paiement partiel' },
  ]

  return (
    <div>
      <PageHeader title="Nouvelle vente" subtitle={`Vendeur : ${currentUser?.name} · Dépôt ${depot}`} icon={ShoppingCart}
        actions={<button className="btn-ghost" onClick={cancelSale}><X size={16} /> Annuler</button>} />

      <div className="grid gap-4 lg:grid-cols-3">
        {/* Colonne gauche : article + panier */}
        <div className="space-y-4 lg:col-span-2">
          <SectionCard title="Ajouter un article" icon={Search} bodyClass="p-5">
            <div className="grid gap-4 sm:grid-cols-2">
              {/* Recherche produit */}
              <div className="sm:col-span-2 relative">
                <label className="label">Produit</label>
                <div className="relative">
                  <Search size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input className="input pl-9" placeholder="Rechercher un produit…" value={search}
                    onChange={(e) => { setSearch(e.target.value); setPickerOpen(true); setProductId(null) }}
                    onFocus={() => setPickerOpen(true)} />
                </div>
                {pickerOpen && (
                  <>
                    <div className="fixed inset-0 z-10" onClick={() => setPickerOpen(false)} />
                    <div className="absolute left-0 right-0 top-full z-20 mt-1 max-h-64 overflow-y-auto rounded-xl border border-slate-200 bg-white p-1.5 shadow-soft">
                      {filtered.length === 0 && <p className="px-3 py-4 text-center text-sm text-slate-400">Aucun produit</p>}
                      {filtered.map((p) => (
                        <button key={p.id} onClick={() => selectProduct(p)}
                          className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm hover:bg-slate-50">
                          <span className="flex-1 truncate font-medium text-slate-700">{p.name}</span>
                          <span className="text-xs text-slate-400">{p.units.length} unités</span>
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </div>

              <div>
                <label className="label">Dépôt</label>
                <select className="input" value={depot} onChange={(e) => setDepot(e.target.value)}>
                  <option value="A">Dépôt A — Analakely</option>
                  <option value="B">Dépôt B — Anosizato</option>
                </select>
              </div>
              <div>
                <label className="label">Unité</label>
                <select className="input" value={unitIdx} onChange={(e) => changeUnit(Number(e.target.value))} disabled={!product}>
                  {product ? product.units.map((u, i) => <option key={i} value={i}>{u.label}</option>) : <option>—</option>}
                </select>
              </div>
              <div>
                <label className="label">Quantité</label>
                <input type="number" min="0" className="input" value={qty} onChange={(e) => setQty(e.target.value)} disabled={!product} />
              </div>
              <div>
                <label className="label">Prix unitaire (Ar)</label>
                <input type="number" min="0" className="input" value={price} onChange={(e) => setPrice(e.target.value)} disabled={!product} />
              </div>
              <div>
                <label className="label flex items-center gap-1">Remise (Ar) {!isAdmin && <Lock size={11} className="text-amber-500" />}</label>
                <input type="number" min="0" className={`input ${!isAdmin ? 'cursor-pointer bg-slate-50' : ''}`} value={discount}
                  readOnly={!isAdmin} onClick={tryDiscount}
                  onChange={(e) => isAdmin && setDiscount(e.target.value)} disabled={!product} />
              </div>
              <div className="flex items-end">
                <div className="w-full rounded-lg bg-brand-50 px-3 py-2.5 text-right">
                  <p className="text-[11px] font-semibold uppercase text-brand-600">Total ligne</p>
                  <p className="text-lg font-extrabold text-brand-700 tabular-nums">{ariary(lineTotal)}</p>
                </div>
              </div>
            </div>

            {/* Aperçu conversion automatique */}
            {product && (
              <div className="mt-4 flex flex-wrap items-center gap-x-2 gap-y-1 rounded-lg border border-dashed border-brand-300 bg-brand-50/50 px-3 py-2.5 text-sm">
                <Badge tone="brand">Conversion auto</Badge>
                <span className="font-semibold text-slate-700">{qty || 0} × {unit.label}</span>
                <span className="text-slate-400">=</span>
                <span className="font-semibold text-slate-700">{fmtQty(product, baseAmount)}</span>
                <span className="mx-1 text-slate-300">•</span>
                <span className="text-slate-500">Stock Dépôt {depot} :</span>
                <span className="font-semibold text-slate-700">{fmtQty(product, depotStock)}</span>
                <ArrowRight size={14} className="text-slate-400" />
                <span className={`font-bold ${depotStock - baseAmount < 0 ? 'text-rose-600' : 'text-brand-700'}`}>
                  {fmtQty(product, depotStock - baseAmount)}
                </span>
              </div>
            )}

            <button className="btn-primary mt-4 w-full" onClick={addToCart}>
              <Plus size={17} /> Ajouter au panier
            </button>
          </SectionCard>

          {/* Panier */}
          <SectionCard title="Panier" subtitle={`${cart.length} article(s)`} icon={ShoppingCart} bodyClass="p-0">
            {cart.length === 0 ? (
              <div className="px-5 py-10 text-center text-sm text-slate-400">Aucun article. Recherchez un produit ci-dessus.</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr>
                      <th className="th">Produit</th><th className="th">Unité</th><th className="th text-right">Qté</th>
                      <th className="th text-right">Prix</th><th className="th text-right">Remise</th>
                      <th className="th text-right">Total</th><th className="th">Dépôt</th><th className="th"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {cart.map((l) => (
                      <tr key={l.key} className="hover:bg-slate-50">
                        <td className="td font-medium text-slate-800">{l.name}</td>
                        <td className="td text-slate-500">{l.unitLabel}</td>
                        <td className="td text-right tabular-nums">{l.qty}</td>
                        <td className="td text-right tabular-nums">{ariary(l.price)}</td>
                        <td className="td text-right tabular-nums">{l.discount ? ariary(l.discount) : '—'}</td>
                        <td className="td text-right font-semibold tabular-nums">{ariary(l.total)}</td>
                        <td className="td"><Badge tone="slate">Dépôt {l.depot}</Badge></td>
                        <td className="td">
                          <button onClick={() => removeLine(l.key)} className="text-slate-400 hover:text-rose-600"><Trash2 size={16} /></button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </SectionCard>
        </div>

        {/* Colonne droite : client + paiement */}
        <div className="lg:sticky lg:top-20 self-start space-y-4">
          <SectionCard title="Client & paiement" bodyClass="p-5 space-y-4">
            <div>
              <label className="label">Client</label>
              <select className="input" value={clientId} onChange={(e) => setClientId(e.target.value)}>
                <option value="comptant">Client comptant</option>
                {clients.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </div>

            <div>
              <label className="label">Mode de paiement</label>
              <div className="grid grid-cols-2 gap-2">
                {payOptions.map((o) => (
                  <button key={o.id} onClick={() => setPayment(o.id)}
                    className={`rounded-lg border px-3 py-2 text-sm font-semibold transition ${
                      payment === o.id ? 'border-brand-500 bg-brand-50 text-brand-700' : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}>
                    {o.label}
                  </button>
                ))}
              </div>
            </div>

            {payment === 'partiel' && (
              <div>
                <label className="label">Montant payé (Ar)</label>
                <input type="number" min="0" className="input" value={paid} onChange={(e) => setPaid(e.target.value)} />
              </div>
            )}

            <div className="space-y-1.5 border-t border-slate-100 pt-3 text-sm">
              <div className="flex justify-between text-slate-500"><span>Sous-total</span><span className="tabular-nums">{ariary(subtotal)}</span></div>
              <div className="flex justify-between text-slate-500"><span>Remise</span><span className="tabular-nums">− {ariary(totalDiscount)}</span></div>
              <div className="flex justify-between text-base font-extrabold text-slate-900"><span>Total</span><span className="tabular-nums">{ariary(grandTotal)}</span></div>
              {payment !== 'especes' && payment !== 'mobile' && (
                <>
                  <div className="flex justify-between text-slate-500"><span>Payé</span><span className="tabular-nums">{ariary(paidNow)}</span></div>
                  <div className="flex justify-between font-semibold text-rose-600"><span>Reste à payer</span><span className="tabular-nums">{ariary(remainingDue)}</span></div>
                </>
              )}
            </div>

            <button className="btn-primary w-full" onClick={validate}><Check size={17} /> Valider la vente</button>
            <div className="grid grid-cols-2 gap-2">
              <button className="btn-secondary" onClick={printInvoice}><Printer size={16} /> Facture A5</button>
              <button className="btn-secondary" onClick={genPO}><FileText size={16} /> Bon de cmd.</button>
            </div>
          </SectionCard>
        </div>
      </div>

      {/* Modal autorisation admin */}
      <Modal open={authModal} onClose={() => setAuthModal(false)} title="Autorisation administrateur nécessaire" icon={ShieldAlert} size="sm"
        footer={<>
          <button className="btn-secondary" onClick={() => setAuthModal(false)}>Fermer</button>
          <button className="btn-primary" onClick={() => { setAuthModal(false); notify('Demande d’autorisation envoyée à l’administrateur.', { type: 'info' }) }}>Demander l’autorisation</button>
        </>}>
        <div className="flex gap-3">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-amber-50 text-amber-500"><Lock size={22} /></span>
          <p className="text-sm text-slate-600">
            Les remises ne peuvent être appliquées que par un <b>administrateur</b>. En tant que <b>vendeur</b>, vous devez demander une autorisation pour modifier le prix ou accorder une remise.
          </p>
        </div>
      </Modal>

      {/* Modal vente validée */}
      <Modal open={doneModal} onClose={() => setDoneModal(false)} title="Vente validée" icon={Check} size="sm"
        footer={<>
          <button className="btn-secondary" onClick={finishSale}>Nouvelle vente</button>
          <button className="btn-primary" onClick={() => { setDoneModal(false); navigate('invoice', { sale: buildSale() }) }}><Printer size={16} /> Imprimer</button>
        </>}>
        <div className="text-center py-2">
          <span className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-50 text-emerald-500"><Check size={30} /></span>
          <p className="text-lg font-bold text-slate-800">Facture FAC-2026-0211</p>
          <p className="text-sm text-slate-500">Montant total : <b>{ariary(grandTotal)}</b></p>
          <p className="mt-1 text-xs text-slate-400">Le stock a été mis à jour automatiquement (simulation).</p>
        </div>
      </Modal>
    </div>
  )
}
