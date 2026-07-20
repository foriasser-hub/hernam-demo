import { CheckCircle2, Info, AlertTriangle, XCircle, X } from 'lucide-react'
import { useApp } from '../context/AppContext'

const typeMap = {
  success: { icon: CheckCircle2, ring: 'border-l-emerald-500', color: 'text-emerald-600' },
  info: { icon: Info, ring: 'border-l-blue-500', color: 'text-blue-600' },
  warning: { icon: AlertTriangle, ring: 'border-l-amber-500', color: 'text-amber-600' },
  error: { icon: XCircle, ring: 'border-l-rose-500', color: 'text-rose-600' },
}

export default function Notifications() {
  const { toasts, dismissToast } = useApp()
  return (
    <div className="fixed bottom-4 right-4 z-[60] flex w-[calc(100vw-2rem)] max-w-sm flex-col gap-2">
      {toasts.map((t) => {
        const cfg = typeMap[t.type] || typeMap.success
        const Icon = cfg.icon
        return (
          <div key={t.id} className={`flex items-start gap-3 rounded-xl border border-slate-200 border-l-4 ${cfg.ring} bg-white p-3.5 shadow-soft animate-slide-in`}>
            <Icon size={20} className={`${cfg.color} shrink-0 mt-0.5`} />
            <div className="min-w-0 flex-1">
              {t.title && <p className="text-sm font-semibold text-slate-800">{t.title}</p>}
              <p className="text-sm text-slate-600">{t.message}</p>
            </div>
            <button onClick={() => dismissToast(t.id)} className="text-slate-400 hover:text-slate-600">
              <X size={16} />
            </button>
          </div>
        )
      })}
    </div>
  )
}
