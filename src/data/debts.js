// Dettes clients (6) et dettes fournisseurs (5) — fictives.
// Statut client : 'en_cours' | 'partiel' | 'retard' | 'paye'
export const clientDebts = [
  { id: 'dc1', clientId: 'c2', invoice: 'FAC-2026-0208', initial: 4800000, paid: 0, due: '2026-07-27', status: 'en_cours' },
  { id: 'dc2', clientId: 'c6', invoice: 'FAC-2026-0180', initial: 6300000, paid: 2000000, due: '2026-07-14', status: 'retard' },
  { id: 'dc3', clientId: 'c1', invoice: 'FAC-2026-0207', initial: 1250000, paid: 500000, due: '2026-07-26', status: 'partiel' },
  { id: 'dc4', clientId: 'c4', invoice: 'FAC-2026-0203', initial: 2100000, paid: 0, due: '2026-07-12', status: 'retard' },
  { id: 'dc5', clientId: 'c5', invoice: 'FAC-2026-0202', initial: 380000, paid: 0, due: '2026-07-31', status: 'en_cours' },
  { id: 'dc6', clientId: 'c8', invoice: 'FAC-2026-0165', initial: 1500000, paid: 580000, due: '2026-07-24', status: 'partiel' },
]

// Statut fournisseur : 'a_payer' | 'partiel' | 'urgent' | 'paye'
export const supplierDebts = [
  { id: 'df1', supplierId: 'f1', invoice: 'ACH-1042', total: 32500000, paid: 0, due: '2026-07-23', status: 'urgent' },
  { id: 'df2', supplierId: 'f5', invoice: 'ACH-1039', total: 12000000, paid: 0, due: '2026-07-22', status: 'urgent' },
  { id: 'df3', supplierId: 'f6', invoice: 'ACH-1044', total: 15000000, paid: 5000000, due: '2026-07-25', status: 'partiel' },
  { id: 'df4', supplierId: 'f3', invoice: 'ACH-1031', total: 10800000, paid: 0, due: '2026-07-28', status: 'a_payer' },
  { id: 'df5', supplierId: 'f4', invoice: 'ACH-1028', total: 3000000, paid: 0, due: '2026-08-05', status: 'a_payer' },
]

export const remaining = (d) => (d.initial ?? d.total) - d.paid
