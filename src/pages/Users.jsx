import { useState } from 'react'
import { UserCog, UserPlus, Check, X, ShieldCheck, User } from 'lucide-react'
import { PageHeader, SectionCard, Badge, Avatar } from '../components/ui'
import Modal from '../components/Modal'
import { useApp } from '../context/AppContext'
import { users, roleLabel } from '../data/users'
import { frDateTime } from '../data/formatters'

const permissions = [
  { label: 'Effectuer des ventes', admin: true, vendeur: true },
  { label: 'Imprimer les documents', admin: true, vendeur: true },
  { label: 'Consulter le stock et les dépôts', admin: true, vendeur: true },
  { label: "Voir les prix d'achat et bénéfices", admin: true, vendeur: false },
  { label: 'Gérer les dépenses', admin: true, vendeur: false },
  { label: 'Effectuer des transferts', admin: true, vendeur: false },
  { label: 'Entrées de stock', admin: true, vendeur: false },
  { label: 'Modifier les prix / accorder des remises', admin: true, vendeur: false },
  { label: 'Annuler des factures', admin: true, vendeur: false },
  { label: 'Accéder au Conseiller IA', admin: true, vendeur: false },
  { label: 'Modifier les paramètres', admin: true, vendeur: false },
]

const Cell = ({ ok }) => ok
  ? <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-emerald-50 text-emerald-600"><Check size={15} /></span>
  : <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-rose-50 text-rose-400"><X size={15} /></span>

export default function Users() {
  const { notify, role, setRole } = useApp()
  const [addOpen, setAddOpen] = useState(false)

  return (
    <div>
      <PageHeader title="Utilisateurs" subtitle="Comptes et droits d'accès" icon={UserCog}
        actions={<button className="btn-primary" onClick={() => setAddOpen(true)}><UserPlus size={16} /> Nouvel utilisateur</button>} />

      {/* Bascule de rôle (démo) */}
      <div className="card mb-4 flex flex-wrap items-center justify-between gap-3 p-4">
        <div>
          <p className="font-semibold text-slate-800">Rôle actif (démonstration)</p>
          <p className="text-sm text-slate-500">Basculez pour voir l'interface telle que la voit chaque profil.</p>
        </div>
        <div className="flex items-center rounded-lg bg-slate-100 p-1 text-sm font-semibold">
          <button onClick={() => setRole('admin')} className={`flex items-center gap-1.5 rounded-md px-3 py-2 ${role === 'admin' ? 'bg-white text-brand-700 shadow-sm' : 'text-slate-500'}`}><ShieldCheck size={16} /> Administrateur</button>
          <button onClick={() => setRole('vendeur')} className={`flex items-center gap-1.5 rounded-md px-3 py-2 ${role === 'vendeur' ? 'bg-white text-brand-700 shadow-sm' : 'text-slate-500'}`}><User size={16} /> Vendeur</button>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-3 mb-4">
        {users.map((u) => (
          <div key={u.id} className="card p-5">
            <div className="flex items-center gap-3">
              <Avatar name={u.name} size="lg" tone={u.role === 'admin' ? 'brand' : 'blue'} />
              <div className="min-w-0">
                <p className="font-bold text-slate-800 truncate">{u.name}</p>
                <Badge tone={u.role === 'admin' ? 'brand' : 'blue'}>{roleLabel(u.role)}</Badge>
              </div>
            </div>
            <div className="mt-4 space-y-1.5 text-sm text-slate-500">
              <div className="flex justify-between"><span>Téléphone</span><span className="text-slate-700">{u.phone}</span></div>
              <div className="flex justify-between"><span>Dépôt</span><span className="text-slate-700">{u.depot}</span></div>
              <div className="flex justify-between"><span>Dernière connexion</span><span className="text-slate-700">{frDateTime(u.lastLogin)}</span></div>
              <div className="flex justify-between"><span>Statut</span>{u.active ? <Badge tone="green" dot>Actif</Badge> : <Badge tone="slate">Inactif</Badge>}</div>
            </div>
          </div>
        ))}
      </div>

      <SectionCard title="Matrice des permissions" icon={ShieldCheck} bodyClass="p-0">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead><tr>
              <th className="th">Fonctionnalité</th>
              <th className="th text-center">Administrateur</th>
              <th className="th text-center">Vendeur</th>
            </tr></thead>
            <tbody className="divide-y divide-slate-100">
              {permissions.map((p) => (
                <tr key={p.label} className="hover:bg-slate-50">
                  <td className="td font-medium text-slate-700">{p.label}</td>
                  <td className="td text-center"><Cell ok={p.admin} /></td>
                  <td className="td text-center"><Cell ok={p.vendeur} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SectionCard>

      <Modal open={addOpen} onClose={() => setAddOpen(false)} title="Nouvel utilisateur" icon={UserPlus}
        footer={<>
          <button className="btn-secondary" onClick={() => setAddOpen(false)}>Annuler</button>
          <button className="btn-primary" onClick={() => { setAddOpen(false); notify('Utilisateur créé (simulation).', { type: 'success' }) }}>Créer le compte</button>
        </>}>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2"><label className="label">Nom complet</label><input className="input" placeholder="Ex : Naina RASOA" /></div>
          <div><label className="label">Téléphone</label><input className="input" placeholder="+261 …" /></div>
          <div><label className="label">Rôle</label><select className="input"><option>Vendeur</option><option>Administrateur</option></select></div>
          <div><label className="label">Dépôt affecté</label><select className="input"><option>Dépôt A</option><option>Dépôt B</option><option>Tous</option></select></div>
        </div>
      </Modal>
    </div>
  )
}
