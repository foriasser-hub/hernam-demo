// Catalogue produits (données fictives). Prix en Ariary, par unité de base.
// units[].factor = nombre d'unités de base contenues dans l'unité.
// tier = 'gros' (grande unité) ou 'detail' (petite unité) → sert au prix suggéré en vente.

export const categories = [
  'Céréales',
  'Épicerie',
  'Biscuiterie',
  'Confiserie',
  'Hygiène',
  'Boissons',
  'Conserves',
  'Divers',
]

export const products = [
  {
    id: 'p01', name: 'Riz Makalioka', category: 'Céréales', supplierId: 'f1',
    baseUnit: 'kg',
    units: [ { label: 'Sac (50 kg)', factor: 50, tier: 'gros' }, { label: 'Kg', factor: 1, tier: 'detail' }, { label: 'Gramme', factor: 0.001, tier: 'detail' } ],
    stockA: 620, stockB: 1500, threshold: 200,
    purchasePrice: 2600, wholesalePrice: 2900, retailPrice: 3200,
  },
  {
    id: 'p02', name: 'Riz Vary Gasy', category: 'Céréales', supplierId: 'f1',
    baseUnit: 'kg',
    units: [ { label: 'Sac (50 kg)', factor: 50, tier: 'gros' }, { label: 'Kg', factor: 1, tier: 'detail' }, { label: 'Gramme', factor: 0.001, tier: 'detail' } ],
    stockA: 40, stockB: 90, threshold: 150,
    purchasePrice: 2400, wholesalePrice: 2700, retailPrice: 3000,
  },
  {
    id: 'p03', name: 'Sucre roux', category: 'Épicerie', supplierId: 'f1',
    baseUnit: 'kg',
    units: [ { label: 'Sac (50 kg)', factor: 50, tier: 'gros' }, { label: 'Kg', factor: 1, tier: 'detail' }, { label: '500 g', factor: 0.5, tier: 'detail' }, { label: '250 g', factor: 0.25, tier: 'detail' } ],
    stockA: 0, stockB: 120, threshold: 100,
    purchasePrice: 2800, wholesalePrice: 3100, retailPrice: 3500,
  },
  {
    id: 'p04', name: 'Huile végétale 1L', category: 'Épicerie', supplierId: 'f2',
    baseUnit: 'L',
    units: [ { label: 'Bidon (20 L)', factor: 20, tier: 'gros' }, { label: 'Litre', factor: 1, tier: 'detail' } ],
    stockA: 480, stockB: 900, threshold: 120,
    purchasePrice: 8500, wholesalePrice: 9500, retailPrice: 10500,
  },
  {
    id: 'p05', name: 'Farine de blé', category: 'Épicerie', supplierId: 'f1',
    baseUnit: 'kg',
    units: [ { label: 'Sac (25 kg)', factor: 25, tier: 'gros' }, { label: 'Kg', factor: 1, tier: 'detail' } ],
    stockA: 300, stockB: 250, threshold: 100,
    purchasePrice: 2200, wholesalePrice: 2500, retailPrice: 2800,
  },
  {
    id: 'p06', name: 'Biscuits Petit Beurre', category: 'Biscuiterie', supplierId: 'f3',
    baseUnit: 'paquet',
    units: [ { label: 'Carton (24 paquets)', factor: 24, tier: 'gros' }, { label: 'Paquet', factor: 1, tier: 'detail' } ],
    stockA: 260, stockB: 130, threshold: 80, expiringSoon: true,
    purchasePrice: 1200, wholesalePrice: 1500, retailPrice: 1800,
  },
  {
    id: 'p07', name: 'Bonbons anglais', category: 'Confiserie', supplierId: 'f3',
    baseUnit: 'pièce',
    units: [ { label: 'Carton (2400 pièces)', factor: 2400, tier: 'gros' }, { label: 'Paquet (50)', factor: 50, tier: 'detail' }, { label: 'Pièce', factor: 1, tier: 'detail' } ],
    stockA: 5000, stockB: 12000, threshold: 2000,
    purchasePrice: 40, wholesalePrice: 60, retailPrice: 100,
  },
  {
    id: 'p08', name: 'Savon Mira 400g', category: 'Hygiène', supplierId: 'f4',
    baseUnit: 'pièce',
    units: [ { label: 'Carton (48)', factor: 48, tier: 'gros' }, { label: 'Paquet (12)', factor: 12, tier: 'detail' }, { label: 'Pièce', factor: 1, tier: 'detail' } ],
    stockA: 720, stockB: 480, threshold: 150,
    purchasePrice: 1300, wholesalePrice: 1600, retailPrice: 2000,
  },
  {
    id: 'p09', name: 'Pâtes Spaghetti 500g', category: 'Épicerie', supplierId: 'f3',
    baseUnit: 'pièce',
    units: [ { label: 'Carton (20)', factor: 20, tier: 'gros' }, { label: 'Pièce', factor: 1, tier: 'detail' } ],
    stockA: 180, stockB: 90, threshold: 60,
    purchasePrice: 1400, wholesalePrice: 1700, retailPrice: 2000,
  },
  {
    id: 'p10', name: 'Cube Jumbo', category: 'Épicerie', supplierId: 'f5',
    baseUnit: 'pièce',
    units: [ { label: 'Carton (600)', factor: 600, tier: 'gros' }, { label: 'Paquet (60)', factor: 60, tier: 'detail' }, { label: 'Pièce', factor: 1, tier: 'detail' } ],
    stockA: 8000, stockB: 15000, threshold: 3000,
    purchasePrice: 90, wholesalePrice: 120, retailPrice: 150,
  },
  {
    id: 'p11', name: 'Sel iodé', category: 'Épicerie', supplierId: 'f1',
    baseUnit: 'kg',
    units: [ { label: 'Sac (25 kg)', factor: 25, tier: 'gros' }, { label: 'Kg', factor: 1, tier: 'detail' } ],
    stockA: 150, stockB: 400, threshold: 80,
    purchasePrice: 900, wholesalePrice: 1100, retailPrice: 1400,
  },
  {
    id: 'p12', name: 'Boisson THB 65cl', category: 'Boissons', supplierId: 'f5',
    baseUnit: 'pièce',
    units: [ { label: 'Carton (12)', factor: 12, tier: 'gros' }, { label: 'Pièce', factor: 1, tier: 'detail' } ],
    stockA: 360, stockB: 720, threshold: 120,
    purchasePrice: 2200, wholesalePrice: 2600, retailPrice: 3000,
  },
  {
    id: 'p13', name: 'Lait en poudre 400g', category: 'Épicerie', supplierId: 'f6',
    baseUnit: 'boîte',
    units: [ { label: 'Carton (24)', factor: 24, tier: 'gros' }, { label: 'Boîte', factor: 1, tier: 'detail' } ],
    stockA: 96, stockB: 48, threshold: 40, expiringSoon: true,
    purchasePrice: 9500, wholesalePrice: 11000, retailPrice: 12500,
  },
  {
    id: 'p14', name: 'Café moulu 250g', category: 'Épicerie', supplierId: 'f6',
    baseUnit: 'paquet',
    units: [ { label: 'Carton (40)', factor: 40, tier: 'gros' }, { label: 'Paquet', factor: 1, tier: 'detail' } ],
    stockA: 200, stockB: 120, threshold: 60,
    purchasePrice: 3200, wholesalePrice: 3800, retailPrice: 4500,
  },
  {
    id: 'p15', name: "Sardines à l'huile", category: 'Conserves', supplierId: 'f6',
    baseUnit: 'boîte',
    units: [ { label: 'Carton (50)', factor: 50, tier: 'gros' }, { label: 'Boîte', factor: 1, tier: 'detail' } ],
    stockA: 300, stockB: 500, threshold: 100,
    purchasePrice: 2400, wholesalePrice: 2800, retailPrice: 3200,
  },
  {
    id: 'p16', name: 'Concentré de tomate 70g', category: 'Conserves', supplierId: 'f6',
    baseUnit: 'boîte',
    units: [ { label: 'Carton (50)', factor: 50, tier: 'gros' }, { label: 'Boîte', factor: 1, tier: 'detail' } ],
    stockA: 250, stockB: 700, threshold: 120,
    purchasePrice: 600, wholesalePrice: 800, retailPrice: 1000,
  },
  {
    id: 'p17', name: 'Allumettes', category: 'Divers', supplierId: 'f5',
    baseUnit: 'paquet',
    units: [ { label: 'Carton (100)', factor: 100, tier: 'gros' }, { label: 'Paquet', factor: 1, tier: 'detail' } ],
    stockA: 30, stockB: 15, threshold: 50,
    purchasePrice: 150, wholesalePrice: 200, retailPrice: 300,
  },
  {
    id: 'p18', name: 'Bougies', category: 'Divers', supplierId: 'f5',
    baseUnit: 'paquet',
    units: [ { label: 'Carton (50)', factor: 50, tier: 'gros' }, { label: 'Paquet', factor: 1, tier: 'detail' } ],
    stockA: 120, stockB: 200, threshold: 50,
    purchasePrice: 700, wholesalePrice: 900, retailPrice: 1200,
  },
  {
    id: 'p19', name: 'Semoule de maïs', category: 'Céréales', supplierId: 'f1',
    baseUnit: 'kg',
    units: [ { label: 'Sac (25 kg)', factor: 25, tier: 'gros' }, { label: 'Kg', factor: 1, tier: 'detail' } ],
    stockA: 0, stockB: 0, threshold: 60,
    purchasePrice: 1800, wholesalePrice: 2100, retailPrice: 2400,
  },
  {
    id: 'p20', name: 'Lentilles', category: 'Épicerie', supplierId: 'f1',
    baseUnit: 'kg',
    units: [ { label: 'Sac (25 kg)', factor: 25, tier: 'gros' }, { label: 'Kg', factor: 1, tier: 'detail' } ],
    stockA: 180, stockB: 220, threshold: 80,
    purchasePrice: 3000, wholesalePrice: 3400, retailPrice: 3800,
  },
]

export const totalStock = (p) => p.stockA + p.stockB

// Statut global du produit (tous dépôts)
export function statusOf(p) {
  const total = totalStock(p)
  if (total <= 0) return 'epuise'
  if (p.expiringSoon) return 'perime'
  if (total <= p.threshold) return 'faible'
  return 'disponible'
}

// Statut vu depuis un dépôt précis
export function statusForDepot(p, depot) {
  const here = depot === 'A' ? p.stockA : p.stockB
  const other = depot === 'A' ? p.stockB : p.stockA
  if (here <= 0 && other > 0) return 'autre_depot'
  if (here <= 0) return 'epuise'
  if (p.expiringSoon) return 'perime'
  if (here <= p.threshold) return 'faible'
  return 'disponible'
}

// Quantité + unité de base lisible : 620 kg / 5 000 pièces
export function fmtQty(p, amount) {
  const n = Number(amount) || 0
  const rounded = Number.isInteger(n) ? n : Math.round(n * 1000) / 1000
  return rounded.toLocaleString('fr-FR').replace(/ /g, ' ') + ' ' + p.baseUnit
}

export const productById = (id) => products.find((p) => p.id === id)
