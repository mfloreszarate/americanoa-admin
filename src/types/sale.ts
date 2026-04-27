export type SaleStatus = "Completada" | "Pendiente" | "Anulada";

export type SalePaymentMethod = "Efectivo" | "Tarjeta" | "Digital";

export interface SaleRow {
  id: string;
  dateTime: string;
  customer: string;
  itemsCount: number;
  subtotal: number;
  discount: number;
  total: number;
  paymentMethod: SalePaymentMethod;
  status: SaleStatus;
  cashier: string;
}
