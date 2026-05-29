export interface FacturaItem {
  id?: number;
  producto: string;
  cantidad: number;
  precioUnitario: number;
  totalLínea: number;
}

export interface Factura {
  id?: number;
  cliente: string;
  rfc?: string;
  fecha: string;
  items: FacturaItem[];
  subtotal: number;
  iva: number;
  total: number;
}