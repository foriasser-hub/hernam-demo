import {
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  PieChart, Pie, Cell, BarChart, Bar, Legend,
} from 'recharts'
import { LayoutDashboard, ShoppingCart, AlertTriangle, Info, ArrowRight, Sparkles } from 'lucide-react'
import { PageHeader, SectionCard, Badge } from '../components/ui'
import StatCard from '../components/StatCard'
import { useApp } from '../context/AppContext'
import { kpis } from '../data/dashboard'
import { salesTrend, topProducts, chartColors } from '../data/charts'
import { expenses, expenseCategories } from '../data/expenses'
import { products, categories } from '../data/products'
import { alerts, aiRecommendations } from '../data/insights'
import { ariary, ariaryShort } from '../data/formatters'

const sevStyle = {
  danger: { icon: AlertTriangle, box: 'bg-rose-50 border-rose-200', ic: 'text-rose-500' },
  warning: { icon: AlertTriangle, box: 'bg-amber-50 border-amber-200', ic: 'text-amber-500' },
  info: { icon: Info, box: 'bg-blue-50 border-blue-200', ic: 'text-blue-500' },
}
const actionTarget = { Transférer: 'transfers', Commander: 'stock-entries', Voir: 'supplier-debts', Relancer: 'client-debts', Vérifier: 'cash' }

export default function Dashboard() {
  const { isAdmin, navigate, notify, currentUser } = useApp()

  const visibleKpis = kpis.filter((k) => isAdmin || !k.sensitive)

  const expensesByCat = expenseCategories
    .map((cat) => ({ cat, montant: expenses.filter((e) => e.category === cat).reduce((s, e) => s + e.amount, 0) }))
    .filter((x) => x.montant > 0)

  const stockByCat = categories
    .map((cat) => {
      const ps = products.filter((p) => p.category === cat)
      return {
        cat,
        'Dépôt A': ps.reduce((s, p) => s + p.stockA * p.purchasePrice, 0),
        'Dépôt B': ps.reduce((s, p) => s + p.stockB * p.purchasePrice, 0),
      }
    })
    .filter((x) => x['Dépôt A'] + x['Dépôt B'] > 0)

  return (
    <div>
      <PageHeader
        title="Tableau de bord"
        subtitle={`Bonjour ${currentUser?.name?.split(' ')[0]}, voici l'activité du jour — 20 juillet 2026`}
        icon={LayoutDashboard}
        actions={
          <button className="btn-primary" onClick={() => navigate('new-sale')}>
            <ShoppingCart size={17} /> Nouvelle vente
          </button>
        }
      />

      {/* Indicateurs clés */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-5">
        {visibleKpis.map((k) => (
          <StatCard key={k.key} label={k.label} value={ariary(k.value)} delta={k.delta} icon={k.icon} tone={k.tone} />
        ))}
      </div>

      {!isAdmin && (
        <p className="mt-3 text-xs text-slate-400">
          Certaines données (bénéfices, dépenses, capital, dettes fournisseurs) sont masquées pour le rôle Vendeur.
        </p>
      )}

      {/* Graphiques */}
      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        <SectionCard title="Évolution des ventes (7 jours)" className="lg:col-span-2" bodyClass="p-4">
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={salesTrend} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="gVentes" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#0f924f" stopOpacity={0.35} />
                  <stop offset="100%" stopColor="#0f924f" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#eef2f5" vertical={false} />
              <XAxis dataKey="jour" tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <YAxis tickFormatter={ariaryShort} tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false} width={48} />
              <Tooltip formatter={(v) => ariary(v)} contentStyle={{ borderRadius: 12, border: '1px solid #e2e8f0', fontSize: 13 }} />
              <Area type="monotone" dataKey="ventes" name="Ventes" stroke="#0f924f" strokeWidth={2.5} fill="url(#gVentes)" />
            </AreaChart>
          </ResponsiveContainer>
        </SectionCard>

        <SectionCard title="Produits les plus vendus" subtitle="Part du CA du mois" bodyClass="p-4">
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie data={topProducts} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={52} outerRadius={82} paddingAngle={2}>
                {topProducts.map((_, i) => (
                  <Cell key={i} fill={chartColors[i % chartColors.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(v, n) => [`${v}%`, n]} contentStyle={{ borderRadius: 12, border: '1px solid #e2e8f0', fontSize: 13 }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-2 space-y-1.5">
            {topProducts.slice(0, 4).map((p, i) => (
              <div key={p.name} className="flex items-center gap-2 text-xs">
                <span className="h-2.5 w-2.5 rounded-full" style={{ background: chartColors[i] }} />
                <span className="flex-1 truncate text-slate-600">{p.name}</span>
                <span className="font-semibold text-slate-700">{p.value}%</span>
              </div>
            ))}
          </div>
        </SectionCard>
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-2">
        {isAdmin && (
          <SectionCard title="Dépenses par catégorie" subtitle="Mois en cours" bodyClass="p-4">
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={expensesByCat} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#eef2f5" vertical={false} />
                <XAxis dataKey="cat" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} interval={0} angle={-20} textAnchor="end" height={50} />
                <YAxis tickFormatter={ariaryShort} tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false} width={48} />
                <Tooltip formatter={(v) => ariary(v)} contentStyle={{ borderRadius: 12, border: '1px solid #e2e8f0', fontSize: 13 }} />
                <Bar dataKey="montant" name="Montant" fill="#f59e0b" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </SectionCard>
        )}

        <SectionCard title="Comparaison du stock A / B" subtitle="Valeur d'achat par catégorie" className={isAdmin ? '' : 'lg:col-span-2'} bodyClass="p-4">
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={stockByCat} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#eef2f5" vertical={false} />
              <XAxis dataKey="cat" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} interval={0} angle={-20} textAnchor="end" height={50} />
              <YAxis tickFormatter={ariaryShort} tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false} width={48} />
              <Tooltip formatter={(v) => ariary(v)} contentStyle={{ borderRadius: 12, border: '1px solid #e2e8f0', fontSize: 13 }} />
              <Legend wrapperStyle={{ fontSize: 12 }} />
              <Bar dataKey="Dépôt A" fill="#0f924f" radius={[4, 4, 0, 0]} />
              <Bar dataKey="Dépôt B" fill="#40cd7f" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </SectionCard>
      </div>

      {/* Alertes + IA */}
      <div className="mt-4 grid gap-4 lg:grid-cols-3">
        <SectionCard title="Alertes" subtitle={`${alerts.length} à traiter`} className="lg:col-span-2" bodyClass="p-4 space-y-2.5">
          {alerts.map((a) => {
            const s = sevStyle[a.severity]
            const Icon = s.icon
            return (
              <div key={a.id} className={`flex items-start gap-3 rounded-xl border p-3 ${s.box}`}>
                <Icon size={18} className={`${s.ic} shrink-0 mt-0.5`} />
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-slate-800">{a.title}</p>
                  <p className="text-xs text-slate-600">{a.text}</p>
                </div>
                <button
                  onClick={() => (actionTarget[a.action] ? navigate(actionTarget[a.action]) : notify('Action simulée'))}
                  className="shrink-0 inline-flex items-center gap-1 rounded-lg bg-white/70 px-2.5 py-1.5 text-xs font-semibold text-slate-700 hover:bg-white"
                >
                  {a.action} <ArrowRight size={13} />
                </button>
              </div>
            )
          })}
        </SectionCard>

        <SectionCard title="Conseiller IA" subtitle="Recommandations" icon={Sparkles} bodyClass="p-4 space-y-2.5">
          {aiRecommendations.slice(0, 3).map((r) => (
            <div key={r.id} className="rounded-xl bg-slate-50 p-3">
              <Badge tone={r.urgency === 'haute' ? 'red' : r.urgency === 'moyenne' ? 'amber' : 'blue'} className="mb-1.5">
                {r.urgency === 'haute' ? 'Urgent' : r.urgency === 'moyenne' ? 'À surveiller' : 'Info'}
              </Badge>
              <p className="text-xs text-slate-600 leading-relaxed">{r.text}</p>
            </div>
          ))}
          <button onClick={() => navigate(isAdmin ? 'ai' : 'dashboard')} disabled={!isAdmin} className="btn-secondary w-full mt-1 disabled:opacity-50">
            {isAdmin ? 'Ouvrir le conseiller' : 'Réservé à l’administrateur'}
          </button>
        </SectionCard>
      </div>
    </div>
  )
}
