// Alertes du tableau de bord + recommandations du Conseiller IA (fictives).

// severity: 'danger' | 'warning' | 'info'
export const alerts = [
  { id: 'a1', severity: 'danger', title: 'Stock de sucre épuisé au Dépôt A', text: 'Sucre roux : 0 kg au Dépôt A. 120 kg disponibles au Dépôt B.', action: 'Transférer' },
  { id: 'a2', severity: 'warning', title: 'Riz Vary Gasy presque épuisé', text: 'Stock total 130 kg — sous le seuil d’alerte (150 kg).', action: 'Commander' },
  { id: 'a3', severity: 'warning', title: 'Fournisseur à payer dans 3 jours', text: 'SOMADA Import — 32 500 000 Ar dus le 23/07/2026.', action: 'Voir' },
  { id: 'a4', severity: 'danger', title: 'Client en retard de paiement', text: 'Marché Anosibe – Jaona : 4 300 000 Ar en retard depuis le 14/07.', action: 'Relancer' },
  { id: 'a5', severity: 'info', title: 'Différence de caisse détectée', text: 'Écart de −15 000 Ar constaté à la clôture d’hier (Dépôt A).', action: 'Vérifier' },
]

// urgency: 'haute' | 'moyenne' | 'info'
export const aiRecommendations = [
  { id: 'r1', urgency: 'info', text: 'Le riz représente 42 % des ventes du mois. Pensez à sécuriser votre stock chez SOMADA.' },
  { id: 'r2', urgency: 'haute', text: 'Le sucre est épuisé au Dépôt A mais disponible au Dépôt B. Transférez 30 kg pour éviter une rupture de vente.' },
  { id: 'r3', urgency: 'moyenne', text: 'Les dépenses de transport ont augmenté de 18 % cette semaine. Vérifiez les trajets de livraison.' },
  { id: 'r4', urgency: 'haute', text: 'Trois fournisseurs doivent être payés dans les 5 prochains jours, pour un total de 44 500 000 Ar.' },
  { id: 'r5', urgency: 'moyenne', text: 'Les biscuits se vendent moins bien depuis trois semaines (−12 %). Envisagez une promotion.' },
]

export const aiHistory = [
  { id: 'h1', date: '2026-07-19', question: 'Quel produit rapporte le plus ce mois-ci ?', answer: 'Le riz Makalioka, avec 18,6 M Ar de ventes (42 % du CA).' },
  { id: 'h2', date: '2026-07-18', question: 'Quels clients sont en retard de paiement ?', answer: 'Marché Anosibe – Jaona et Superette Voahangy, pour un total de 6,4 M Ar.' },
  { id: 'h3', date: '2026-07-17', question: 'Le stock de riz est-il suffisant ?', answer: 'Oui, 2 120 kg au total, soit environ 3 semaines de ventes au rythme actuel.' },
]

// Suggestions rapides sous la zone de question
export const aiSuggestions = [
  'Quels produits sont bientôt en rupture ?',
  'Quel est mon bénéfice estimé ce mois-ci ?',
  'Quels fournisseurs dois-je payer cette semaine ?',
  'Quel dépôt vend le plus ?',
]
