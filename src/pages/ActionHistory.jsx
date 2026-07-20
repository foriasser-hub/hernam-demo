import { useState, useMemo } from 'react'
import { ScrollText, Search, Smartphone, Monitor } from 'lucide-react'
import { PageHeader, SectionCard, Badge } from '../components/ui'
import { actionLog } from '../data/actionLog'
import { roleLabel } from '../data/users'

const modules = ['Tous', 'Ventes', 'Transferts', 'Dépenses', 'Fournisseurs', 'Factures', 'Entrées de stock', 'Système']

export default function ActionHistory() {
  const [q, setQ] = useState('')
  const [module, setModule] = useState('Tous')

  const rows = useMemo(
    () => actionLog.filter((l) =>
      (module === 'Tous' || l.module === module) &&
      (l.user.toLowerCase().includes(q.toLowerCase()) || l.action.toLowerCase().includes(q.toLowerCase()) || l.detail.toLowerCase().includes(q.toLowerCase()))),
    [q, module],
  )

  return (
    <div>
      <PageHeader title="Historique des actions" subtitle="Journal d'activité et traçabilité" icon={ScrollText} />

      <SectionCard bodyClass="p-0">
        <div className="flex flex-wrap items-center gap-2 border-b border-slate-100 p-4">
          <div className="relative min-w-[200px] flex-1">
            <Search size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input className="input pl-9" placeholder="Rechercher une action, un utilisateur…" value={q} onChange={(e) => setQ(e.target.value)} />
          </div>
          <select className="input w-auto" value={module} onChange={(e) => setModule(e.target.value)}>
            {modules.map((m) => <option key={m}>{m}</option>)}
          </select>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead><tr>
              <th className="th">Date</th><th className="th">Heure</th><th className="th">Utilisateur</th><th className="th">Rôle</th>
              <th className="th">Action</th><th className="th">Détail</th><th className="th">Module</th><th className="th">Appareil</th>
            </tr></thead>
            <tbody className="divide-y divide-slate-100">
              {rows.map((l) => (
                <tr key={l.id} className="hover:bg-slate-50">
                  <td className="td text-slate-500">{l.date}</td>
                  <td className="td tabular-nums text-slate-500">{l.time}</td>
                  <td className="td font-medium text-slate-800">{l.user}</td>
                  <td className="td"><Badge tone={l.role === 'admin' ? 'brand' : 'blue'}>{roleLabel(l.role)}</Badge></td>
                  <td className="td font-medium text-slate-700">{l.action}</td>
                  <td className="td text-slate-500 max-w-[220px] truncate">{l.detail}</td>
                  <td className="td"><Badge tone="slate">{l.module}</Badge></td>
                  <td className="td text-slate-500">
                    <span className="inline-flex items-center gap-1.5">
                      {l.device.toLowerCase().includes('android') ? <Smartphone size={14} className="text-slate-400" /> : <Monitor size={14} className="text-slate-400" />}
                      {l.device}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SectionCard>
    </div>
  )
}
