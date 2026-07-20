import * as Icons from 'lucide-react'
import { ArrowUpRight, ArrowDownRight } from 'lucide-react'

const toneMap = {
  brand: 'bg-brand-50 text-brand-600',
  blue: 'bg-blue-50 text-blue-600',
  indigo: 'bg-indigo-50 text-indigo-600',
  emerald: 'bg-emerald-50 text-emerald-600',
  rose: 'bg-rose-50 text-rose-600',
  amber: 'bg-amber-50 text-amber-600',
  orange: 'bg-orange-50 text-orange-600',
  slate: 'bg-slate-100 text-slate-600',
  red: 'bg-rose-50 text-rose-600',
}

export default function StatCard({ label, value, delta, icon, tone = 'brand', hint }) {
  const Icon = typeof icon === 'string' ? Icons[icon] || Icons.Circle : icon
  const showDelta = typeof delta === 'number' && delta !== 0
  const up = delta > 0
  return (
    <div className="card p-4 sm:p-5 hover:shadow-soft transition-shadow">
      <div className="flex items-start justify-between gap-2">
        <span className={`flex h-10 w-10 items-center justify-center rounded-xl ${toneMap[tone] || toneMap.brand}`}>
          <Icon size={20} />
        </span>
        {showDelta && (
          <span className={`inline-flex items-center gap-0.5 text-xs font-bold ${up ? 'text-emerald-600' : 'text-rose-600'}`}>
            {up ? <ArrowUpRight size={13} /> : <ArrowDownRight size={13} />}
            {Math.abs(delta)}%
          </span>
        )}
      </div>
      <p className="mt-3 text-xl font-extrabold tracking-tight text-slate-900 tabular-nums">{value}</p>
      <p className="mt-0.5 text-xs font-medium text-slate-500 leading-snug">{label}</p>
      {hint && <p className="mt-1 text-[11px] text-slate-400">{hint}</p>}
    </div>
  )
}
