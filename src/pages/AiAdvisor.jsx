import { useState, useRef, useEffect } from 'react'
import { Sparkles, Send, History, Lightbulb, Bot, User } from 'lucide-react'
import { PageHeader, SectionCard, Badge } from '../components/ui'
import { aiRecommendations, aiHistory, aiSuggestions } from '../data/insights'

const urgencyBadge = (u) =>
  u === 'haute' ? <Badge tone="red" dot>Urgent</Badge> : u === 'moyenne' ? <Badge tone="amber" dot>À surveiller</Badge> : <Badge tone="blue" dot>Info</Badge>

// Réponses simulées (aucune IA réelle)
const cannedAnswers = {
  'Quels produits sont bientôt en rupture ?': "3 produits sont sous le seuil d'alerte : Riz Vary Gasy (130 kg), Allumettes (45 paquets) et Semoule de maïs (épuisée). Pensez à commander.",
  'Quel est mon bénéfice estimé ce mois-ci ?': 'Le bénéfice estimé du mois est de 14 180 000 Ar, en hausse de 9 % par rapport au mois dernier.',
  'Quels fournisseurs dois-je payer cette semaine ?': 'SOMADA Import (32,5 M Ar, le 23/07) et STAR Distribution (12 M Ar, le 22/07) sont à régler en priorité.',
  'Quel dépôt vend le plus ?': "Le Dépôt A (Analakely) représente environ 58 % des ventes ce mois-ci, contre 42 % pour le Dépôt B.",
}
const genericAnswer = "D'après les données de la maquette, l'activité est stable. Le riz reste votre produit phare (42 % du CA). Surveillez les dettes fournisseurs à échéance proche. (Réponse simulée — démonstration.)"

export default function AiAdvisor() {
  const [messages, setMessages] = useState([
    { role: 'bot', text: 'Bonjour ! Je suis votre conseiller. Posez-moi une question sur vos ventes, votre stock ou vos finances.' },
  ])
  const [input, setInput] = useState('')
  const endRef = useRef(null)
  useEffect(() => { endRef.current?.scrollIntoView({ behavior: 'smooth' }) }, [messages])

  const ask = (q) => {
    const question = (q ?? input).trim()
    if (!question) return
    const answer = cannedAnswers[question] || genericAnswer
    setMessages((m) => [...m, { role: 'user', text: question }, { role: 'bot', text: answer }])
    setInput('')
  }

  return (
    <div>
      <PageHeader title="Conseiller IA" subtitle="Assistant d'aide à la décision — démonstration (non connecté)" icon={Sparkles} />

      <div className="mb-4 rounded-xl border border-violet-200 bg-gradient-to-r from-violet-50 to-brand-50 p-4">
        <p className="flex items-center gap-2 text-sm text-slate-600">
          <Bot size={18} className="text-violet-500" />
          Représentation visuelle d'un assistant intelligent. Les réponses sont <b>simulées</b> pour la maquette — aucune IA réelle n'est intégrée.
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        {/* Recommandations */}
        <div className="space-y-4 lg:col-span-2">
          <SectionCard title="Recommandations du jour" icon={Lightbulb} bodyClass="p-4 space-y-2.5">
            {aiRecommendations.map((r) => (
              <div key={r.id} className="flex items-start gap-3 rounded-xl border border-slate-200 p-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-violet-50 text-violet-500"><Sparkles size={17} /></span>
                <div className="min-w-0 flex-1">
                  <div className="mb-1">{urgencyBadge(r.urgency)}</div>
                  <p className="text-sm text-slate-600 leading-relaxed">{r.text}</p>
                </div>
              </div>
            ))}
          </SectionCard>

          {/* Zone de conversation */}
          <SectionCard title="Poser une question" icon={Bot} bodyClass="p-4">
            <div className="mb-3 max-h-72 space-y-3 overflow-y-auto rounded-xl bg-slate-50 p-3">
              {messages.map((m, i) => (
                <div key={i} className={`flex gap-2 ${m.role === 'user' ? 'flex-row-reverse' : ''}`}>
                  <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${m.role === 'user' ? 'bg-brand-100 text-brand-600' : 'bg-violet-100 text-violet-600'}`}>
                    {m.role === 'user' ? <User size={15} /> : <Bot size={15} />}
                  </span>
                  <div className={`max-w-[80%] rounded-2xl px-3.5 py-2 text-sm ${m.role === 'user' ? 'bg-brand-600 text-white' : 'bg-white text-slate-700 border border-slate-200'}`}>
                    {m.text}
                  </div>
                </div>
              ))}
              <div ref={endRef} />
            </div>

            <div className="mb-2 flex flex-wrap gap-1.5">
              {aiSuggestions.map((s) => (
                <button key={s} onClick={() => ask(s)} className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs text-slate-600 hover:border-brand-300 hover:bg-brand-50">{s}</button>
              ))}
            </div>

            <div className="flex gap-2">
              <input className="input" placeholder="Écrivez votre question…" value={input}
                onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && ask()} />
              <button className="btn-primary shrink-0" onClick={() => ask()}><Send size={16} /></button>
            </div>
          </SectionCard>
        </div>

        {/* Historique */}
        <SectionCard title="Historique" icon={History} bodyClass="p-4 space-y-3">
          {aiHistory.map((h) => (
            <div key={h.id} className="rounded-xl border border-slate-200 p-3">
              <p className="text-xs text-slate-400">{h.date}</p>
              <p className="mt-1 text-sm font-semibold text-slate-700">{h.question}</p>
              <p className="mt-1 text-xs text-slate-500 leading-relaxed">{h.answer}</p>
            </div>
          ))}
        </SectionCard>
      </div>
    </div>
  )
}
