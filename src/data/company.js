// Informations société — emplacements fictifs (à remplacer par les vraies valeurs).
export const company = {
  name: 'Tranombarotra HERNAM',
  slogan: 'Gros & Détail — Vente de produits alimentaires',
  nif: 'NIF 0000 1234 567',
  stat: 'STAT 47110 11 2024 0 01234',
  rcs: 'RCS Antananarivo 2024 B 01234',
  address: 'Lot II M 45 Bis, Analakely — Antananarivo 101',
  phone: '+261 34 12 345 67',
  phone2: '+261 32 98 765 43',
  email: 'contact@hernam.mg',
  depots: [
    { id: 'A', name: 'Dépôt A', location: 'Analakely (Magasin principal)' },
    { id: 'B', name: 'Dépôt B', location: 'Anosizato (Entrepôt gros)' },
  ],
}

export const depotName = (id) => (id === 'A' ? 'Dépôt A' : id === 'B' ? 'Dépôt B' : id)
