import { Settings as SettingsIcon, Building2, Warehouse, SlidersHorizontal, ImagePlus, Save } from 'lucide-react'
import { PageHeader, SectionCard, Badge } from '../components/ui'
import { useApp } from '../context/AppContext'
import { company } from '../data/company'

export default function Settings() {
  const { notify } = useApp()
  const save = () => notify('Paramètres enregistrés (simulation).', { type: 'success' })

  return (
    <div>
      <PageHeader title="Paramètres" subtitle="Configuration du logiciel" icon={SettingsIcon}
        actions={<button className="btn-primary" onClick={save}><Save size={16} /> Enregistrer</button>} />

      <div className="grid gap-4 lg:grid-cols-3">
        {/* Société */}
        <SectionCard title="Informations société" icon={Building2} className="lg:col-span-2" bodyClass="p-5">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2 flex items-center gap-4">
              <div className="flex h-20 w-20 items-center justify-center rounded-xl border-2 border-dashed border-slate-300 bg-slate-50">
                <img src="/logo.svg" alt="Logo" className="h-14 w-14" />
              </div>
              <button className="btn-secondary"><ImagePlus size={16} /> Changer le logo</button>
            </div>
            <div className="sm:col-span-2"><label className="label">Nom commercial</label><input className="input" defaultValue={company.name} /></div>
            <div><label className="label">NIF</label><input className="input" defaultValue={company.nif} /></div>
            <div><label className="label">STAT</label><input className="input" defaultValue={company.stat} /></div>
            <div><label className="label">Téléphone principal</label><input className="input" defaultValue={company.phone} /></div>
            <div><label className="label">Téléphone secondaire</label><input className="input" defaultValue={company.phone2} /></div>
            <div className="sm:col-span-2"><label className="label">Adresse</label><input className="input" defaultValue={company.address} /></div>
            <div className="sm:col-span-2"><label className="label">E-mail</label><input className="input" defaultValue={company.email} /></div>
          </div>
        </SectionCard>

        {/* Préférences */}
        <div className="space-y-4">
          <SectionCard title="Dépôts" icon={Warehouse} bodyClass="p-4 space-y-2">
            {company.depots.map((d) => (
              <div key={d.id} className="flex items-center gap-3 rounded-lg border border-slate-200 p-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-50 text-brand-600 font-bold">{d.id}</span>
                <div className="min-w-0"><p className="font-semibold text-slate-800">{d.name}</p><p className="text-xs text-slate-500 truncate">{d.location}</p></div>
              </div>
            ))}
            <button className="btn-secondary w-full">+ Ajouter un dépôt</button>
          </SectionCard>

          <SectionCard title="Préférences" icon={SlidersHorizontal} bodyClass="p-4 space-y-4">
            <div><label className="label">Devise</label>
              <div className="flex items-center gap-2"><input className="input" defaultValue="Ariary (Ar)" readOnly /><Badge tone="brand">MGA</Badge></div></div>
            <div><label className="label">Seuil d'alerte par défaut</label><input type="number" className="input" defaultValue={50} /></div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-600">Autorisation admin pour remises</span>
              <span className="inline-flex h-6 w-11 items-center rounded-full bg-brand-500 px-0.5"><span className="h-5 w-5 translate-x-5 rounded-full bg-white transition" /></span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-600">Impression facture A5</span>
              <span className="inline-flex h-6 w-11 items-center rounded-full bg-brand-500 px-0.5"><span className="h-5 w-5 translate-x-5 rounded-full bg-white transition" /></span>
            </div>
          </SectionCard>
        </div>
      </div>
    </div>
  )
}
