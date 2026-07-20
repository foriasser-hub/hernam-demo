// Utilitaires d'affichage — maquette (aucun calcul métier réel).

// Formate un montant en Ariary : 1 250 000 Ar
export function ariary(value) {
  const n = Math.round(Number(value) || 0)
  return n.toLocaleString('fr-FR').replace(/ /g, ' ') + ' Ar'
}

// Version courte pour les graphiques : 1,25 M
export function ariaryShort(value) {
  const n = Number(value) || 0
  if (Math.abs(n) >= 1_000_000) return (n / 1_000_000).toFixed(n % 1_000_000 === 0 ? 0 : 1) + ' M'
  if (Math.abs(n) >= 1_000) return Math.round(n / 1_000) + ' k'
  return String(Math.round(n))
}

// Nombre simple : 45 000
export function num(value) {
  return (Number(value) || 0).toLocaleString('fr-FR').replace(/ /g, ' ')
}

// Date lisible : 20 juil. 2026
export function frDate(iso) {
  if (!iso) return '—'
  const d = new Date(iso)
  return d.toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', year: 'numeric' })
}

// Date + heure
export function frDateTime(iso) {
  if (!iso) return '—'
  const d = new Date(iso)
  return (
    d.toLocaleDateString('fr-FR', { day: '2-digit', month: 'short' }) +
    ' à ' +
    d.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })
  )
}

export function initials(name = '') {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase()
}
