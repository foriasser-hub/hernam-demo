import { useState } from 'react'
import {
  ResponsiveContainer, BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip,
} from 'recharts'
import {
  BarChart3, FileText, FileSpreadsheet, Printer, TrendingUp, Boxes, Warehouse,
  PackagePlus, Receipt, Wallet, PiggyBank, HandCoins, Truck, ArrowLeftRight, Trophy, ClipboardCheck,
} from 'lucide-react'
import { PageHeader, SectionCard, Badge } from '../components/ui'
import { useApp } from '../context/AppContext'
import { monthlyRevenue, topProducts, chartColors } from '../data/charts'
import { expenses, expenseCategories } from '../data/expenses'
import { products, totalStock } from '../data/products'
import { ariary, ariaryShort } from '../data/formatters'

const reports = [
  { id: 'ventes', label: 'Ventes', icon: TrendingUp },
  { id: 'stock', label: 'Stock', icon: Boxes },
  { id: 'stock-depot', label: 'Stock par dépôt', icon: Warehouse },
  { id: 'entrees', label: 'Entrées de stock', icon: PackagePlus },
  { id: 'depenses', label: 'Dépenses', icon: Receipt },
  { id: 'caisse', label: 'Caisse', icon: Wallet },
  { id: 'benefices', label: 'Bénéfices', icon: PiggyBank },
  { id: 'dettes-clients', label: 'Dettes clients', icon: HandCoins },
  { id: 'dettes-fourn', label: 'Dettes fournisseurs', icon: Truck },
  { id: 'transferts', label: 'Transferts', icon: ArrowLeftRight },
  { id: 'top', label: 'Produits les plus vendus', icon: Trophy },
  { id: 'declaration', label: 'Déclaration de stock', icon: ClipboardCheck },
]

export default function Reports() {
  const { notify } = useApp()
  const [selected, setSelected] = useState('ventes')
  const [period, setPeriod] = useState('mois')

  const report = reports.find((r) => r.id === selected)
  const expensesByCat = expenseCategories
    .map((c) => ({ name: c, montant: expenses.filter((e) => e.category === c).reduce((s, e) => s + e.amount, 0) }))
    .filter((x) => x.montant > 0)

  const exportDoc = (fmt) => notify(`Export ${fmt} du rapport « ${report.label} » (simulation).`, { type: 'success', title: 'Export lancé' })

  return (
    <div>
      <PageHeader title="Rapports" subtitle="Analyses et exports de l'activité" icon={BarChart3} />

      {/* Filtres */}
      <SectionCard bodyClass="p-4" className="mb-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-semibold uppercase text-slate-400">Filtres :</span>
          <select className="input w-auto" value={period} onChange={(e) => setPeriod(e.target.value)}>
            <option value="jour">Aujourd'hui</option><option value="semaine">Cette semaine</option>
            <option value="mois">Ce mois</option><option value="perso">Période personnalisée</option>
          </select>
          {period === 'perso' && (<><input type="date" className="input w-auto" /><span className="text-slate-400">→</span><input type="date" className="input w-auto" /></>)}
          <select className="input w-auto"><option>Tous les dépôts</option><option>Dépôt A</option><option>Dépôt B</option></select>
          <select className="input w-auto"><option>Tous les produits</option>{products.slice(0, 6).map((p) => <option key={p.id}>{p.name}</option>)}</select>
          <select className="input w-auto"><option>Tous les fournisseurs</option></select>
          <div className="ml-auto flex gap-2">
            <button className="btn-secondary" onClick={() => exportDoc('PDF')}><FileText size={16} /> PDF</button>
            <button className="btn-secondary" onClick={() => exportDoc('Excel')}><FileSpreadsheet size={16} /> Excel</button>
            <button className="btn-secondary" onClick={() => exportDoc('impression')}><Printer size={16} /> Imprimer</button>
          </div>
        </div>
      </SectionCard>

      <div className="grid gap-4 lg:grid-cols-4">
        {/* Liste des rapports */}
        <div className="lg:col-span-1">
          <SectionCard title="Rapports disponibles" bodyClass="p-2">
            <div className="space-y-0.5">
              {reports.map((r) => {
                const Icon = r.icon
                const active = selected === r.id
                return (
                  <button key={r.id} onClick={() => setSelected(r.id)}
                    className={`flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium transition ${active ? 'bg-brand-50 text-brand-700' : 'text-slate-600 hover:bg-slate-50'}`}>
                    <Icon size={16} className={active ? 'text-brand-600' : 'text-slate-400'} />
                    <span className="flex-1 text-left">{r.label}</span>
                  </button>
                )
              })}
            </div>
          </SectionCard>
        </div>

        {/* Aperçu du rapport */}
        <div className="lg:col-span-3">
          <SectionCard title={`Rapport : ${report.label}`} subtitle={`Période : ${period === 'mois' ? 'ce mois' : period === 'jour' ? "aujourd'hui" : period === 'semaine' ? 'cette semaine' : 'personnalisée'}`} icon={report.icon} bodyClass="p-5">
            {['ventes', 'benefices'].includes(selected) && (
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={monthlyRevenue}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#eef2f5" vertical={false} />
                  <XAxis dataKey="mois" tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                  <YAxis tickFormatter={ariaryShort} tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false} width={48} />
                  <Tooltip formatter={(v) => ariary(v)} contentStyle={{ borderRadius: 12, border: '1px solid #e2e8f0', fontSize: 13 }} />
                  <Line type="monotone" dataKey="ca" name="Montant" stroke="#0f924f" strokeWidth={2.5} dot={{ r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            )}
            {selected === 'depenses' && (
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={expensesByCat}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#eef2f5" vertical={false} />
                  <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} angle={-20} textAnchor="end" height={50} interval={0} />
                  <YAxis tickFormatter={ariaryShort} tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false} width={48} />
                  <Tooltip formatter={(v) => ariary(v)} contentStyle={{ borderRadius: 12, border: '1px solid #e2e8f0', fontSize: 13 }} />
                  <Bar dataKey="montant" fill="#f59e0b" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            )}
            {selected === 'top' && (
              <div className="grid gap-4 sm:grid-cols-2 items-center">
                <ResponsiveContainer width="100%" height={240}>
                  <PieChart>
                    <Pie data={topProducts} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={50} outerRadius={80}>
                      {topProducts.map((_, i) => <Cell key={i} fill={chartColors[i % chartColors.length]} />)}
                    </Pie>
                    <Tooltip formatter={(v, n) => [`${v}%`, n]} contentStyle={{ borderRadius: 12, fontSize: 13 }} />
                  </PieChart>
                </ResponsiveContainer>
                <div className="space-y-2">
                  {topProducts.map((p, i) => (
                    <div key={p.name} className="flex items-center gap-2 text-sm">
                      <span className="h-2.5 w-2.5 rounded-full" style={{ background: chartColors[i] }} />
                      <span className="flex-1 text-slate-600">{p.name}</span>
                      <span className="font-semibold tabular-nums">{ariary(p.montant)}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {['stock', 'stock-depot', 'declaration'].includes(selected) && (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead><tr><th className="th">Produit</th><th className="th text-right">Dépôt A</th><th className="th text-right">Dépôt B</th><th className="th text-right">Total</th><th className="th text-right">Valeur (achat)</th></tr></thead>
                  <tbody className="divide-y divide-slate-100">
                    {products.map((p) => (
                      <tr key={p.id}><td className="td font-medium text-slate-700">{p.name}</td>
                        <td className="td text-right tabular-nums">{p.stockA} {p.baseUnit}</td>
                        <td className="td text-right tabular-nums">{p.stockB} {p.baseUnit}</td>
                        <td className="td text-right font-semibold tabular-nums">{totalStock(p)} {p.baseUnit}</td>
                        <td className="td text-right tabular-nums text-slate-500">{ariary(totalStock(p) * p.purchasePrice)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            {['entrees', 'caisse', 'dettes-clients', 'dettes-fourn', 'transferts'].includes(selected) && (
              <div className="flex flex-col items-center justify-center py-14 text-center">
                <Badge tone="brand" className="mb-3">Aperçu</Badge>
                <p className="font-semibold text-slate-700">Rapport « {report.label} » prêt à générer</p>
                <p className="mt-1 max-w-sm text-sm text-slate-400">Les données détaillées sont disponibles dans la page dédiée. Utilisez les boutons d'export ci-dessus pour PDF / Excel.</p>
              </div>
            )}
          </SectionCard>
        </div>
      </div>
    </div>
  )
}
