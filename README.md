# Tranombarotra HERNAM — Maquette interactive

Maquette **navigable et cliquable** du futur logiciel de gestion pour un commerce de **gros et de détail** à Madagascar. Objectif : présenter visuellement les fonctionnalités au client, valider l'organisation et corriger les besoins **avant** le développement réel.

> ⚠️ Ceci est une **maquette de démonstration**. Aucune base de données, aucun serveur, aucune API, aucune IA réelle. Toutes les données sont fictives et toutes les actions (enregistrer, imprimer, envoyer, payer…) sont **simulées** dans l'interface.

## Technologies
- React + Vite
- Tailwind CSS
- Lucide React (icônes)
- Recharts (graphiques)
- Données fictives locales (dossier `src/data/`)

## Démarrage
```bash
npm install
npm run dev
```
Puis ouvrir l'adresse affichée (par défaut http://localhost:5173).

Pour construire la version de production :
```bash
npm run build
npm run preview
```

## Fonctionnalités de la maquette
- **21 écrans** accessibles depuis la barre latérale (tableau de bord, ventes, stock, dépôts, transferts, clients, fournisseurs, dettes, dépenses, caisse, factures, bons de commande, rapports, conseiller IA, utilisateurs, historique, paramètres).
- **Bascule de rôle Administrateur / Vendeur** (en haut à droite) : le rôle Vendeur masque les prix d'achat, bénéfices, dépenses, transferts, entrées de stock, conseiller IA et paramètres.
- **Vente multi-unités** avec conversion automatique (sac → kg → g, carton → paquet → pièce…).
- **Autorisation administrateur** demandée quand un vendeur tente une remise.
- **Facture A5** réaliste (logo, NIF, STAT, totaux, reste à payer).
- **Graphiques** : évolution des ventes, produits les plus vendus, dépenses par catégorie, comparaison des dépôts.
- **Responsive** : la barre latérale devient un menu coulissant sur téléphone.
- Devise : **Ariary (Ar)**.

## Personnalisation rapide
- Couleurs de marque : `tailwind.config.js` → `colors.brand`.
- Informations société (nom, NIF, STAT, adresse…) : `src/data/company.js`.
- Produits, clients, ventes, etc. : dossier `src/data/`.
