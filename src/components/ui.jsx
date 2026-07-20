import { initials } from '../data/formatters'

// ---- Badges ----------------------------------------------------------------
const toneClasses = {
  green: 'bg-emerald-50 text-emerald-700 ring-emerald-600/20',
  blue: 'bg-blue-50 text-blue-700 ring-blue-600/20',
  amber: 'bg-amber-50 text-amber-700 ring-amber-600/20',
  red: 'bg-rose-50 text-rose-700 ring-rose-600/20',
  orange: 'bg-orange-50 text-orange-700 ring-orange-600/20',
  purple: 'bg-violet-50 text-violet-700 ring-violet-600/20',
  slate: 'bg-slate-100 text-slate-600 ring-slate-500/20',
  brand: 'bg-brand-50 text-brand-700 ring-brand-600/20',
  gray: 'bg-slate-100 text-slate-600 ring-slate-500/20',
}

export function Badge({ tone = 'slate', children, dot = false, className = '' }) {
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-semibold ring-1 ring-inset ${toneClasses[tone]} ${className}`}>
      {dot && <span className="h-1.5 w-1.5 rounded-full bg-current opacity-70" />}
      {children}
    </span>
  )
}

// Statuts produits / stock
const productStatusMap = {
  disponible: { tone: 'green', label: 'Disponible' },
  faible: { tone: 'amber', label: 'Faible' },
  epuise: { tone: 'red', label: 'Épuisé' },
  autre_depot: { tone: 'blue', label: 'Dispo. autre dépôt' },
  perime: { tone: 'orange', label: 'Bientôt périmé' },
}
export function StatusBadge({ status }) {
  const s = productStatusMap[status] || { tone: 'slate', label: status }
  return <Badge tone={s.tone} dot>{s.label}</Badge>
}

// ---- Cartes ----------------------------------------------------------------
export function Card({ children, className = '', ...rest }) {
  return (
    <div className={`card ${className}`} {...rest}>
      {children}
    </div>
  )
}

export function SectionCard({ title, subtitle, icon: Icon, action, children, className = '', bodyClass = 'p-5' }) {
  return (
    <div className={`card ${className}`}>
      {(title || action) && (
        <div className="flex items-center justify-between gap-3 border-b border-slate-100 px-5 py-4">
          <div className="flex items-center gap-2.5 min-w-0">
            {Icon && (
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
                <Icon size={17} />
              </span>
            )}
            <div className="min-w-0">
              <h3 className="font-semibold text-slate-800 truncate">{title}</h3>
              {subtitle && <p className="text-xs text-slate-500 truncate">{subtitle}</p>}
            </div>
          </div>
          {action}
        </div>
      )}
      <div className={bodyClass}>{children}</div>
    </div>
  )
}

// ---- En-tête de page -------------------------------------------------------
export function PageHeader({ title, subtitle, icon: Icon, actions }) {
  return (
    <div className="flex flex-wrap items-start justify-between gap-3 mb-6">
      <div className="flex items-center gap-3">
        {Icon && (
          <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-600 text-white shadow-sm">
            <Icon size={22} />
          </span>
        )}
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 leading-tight">{title}</h1>
          {subtitle && <p className="text-sm text-slate-500 mt-0.5">{subtitle}</p>}
        </div>
      </div>
      {actions && <div className="flex flex-wrap items-center gap-2">{actions}</div>}
    </div>
  )
}

// ---- Avatar ----------------------------------------------------------------
export function Avatar({ name, size = 'md', tone = 'brand' }) {
  const sizes = { sm: 'h-8 w-8 text-xs', md: 'h-10 w-10 text-sm', lg: 'h-12 w-12 text-base' }
  const tones = {
    brand: 'bg-brand-100 text-brand-700',
    blue: 'bg-blue-100 text-blue-700',
    amber: 'bg-amber-100 text-amber-700',
    slate: 'bg-slate-200 text-slate-600',
  }
  return (
    <span className={`inline-flex items-center justify-center rounded-full font-bold ${sizes[size]} ${tones[tone]}`}>
      {initials(name)}
    </span>
  )
}

// ---- État vide -------------------------------------------------------------
export function EmptyState({ icon: Icon, title, text }) {
  return (
    <div className="flex flex-col items-center justify-center py-14 text-center">
      {Icon && (
        <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-400 mb-3">
          <Icon size={26} />
        </span>
      )}
      <p className="font-semibold text-slate-700">{title}</p>
      {text && <p className="text-sm text-slate-400 mt-1 max-w-xs">{text}</p>}
    </div>
  )
}

// ---- Barre de progression --------------------------------------------------
export function Progress({ value, tone = 'brand' }) {
  const tones = { brand: 'bg-brand-500', amber: 'bg-amber-500', red: 'bg-rose-500', blue: 'bg-blue-500' }
  return (
    <div className="h-2 w-full rounded-full bg-slate-100 overflow-hidden">
      <div className={`h-full rounded-full ${tones[tone]}`} style={{ width: `${Math.min(100, Math.max(0, value))}%` }} />
    </div>
  )
}

// ---- Bandeau maquette (aperçu) --------------------------------------------
export function DemoNote({ children }) {
  return (
    <p className="mt-4 flex items-center gap-2 rounded-lg bg-slate-50 border border-dashed border-slate-300 px-3 py-2 text-xs text-slate-500">
      <span className="inline-block h-1.5 w-1.5 rounded-full bg-slate-400" />
      {children}
    </p>
  )
}
