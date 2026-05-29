// Renombrado para evitar conflicto de nombres con historial-pago.model.ts
export interface HistorialPagoPago{
  id?:number;
  pago: Pago;
  estado: string;
}

export interface Page<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
}

export interface Pago {
  id?: number;
  monto: number;
  fechaPago?: string;
  metodoPago: string;
  referencia?: string;
  factura: Partial<Factura>;
  cliente?: Partial<Cliente>;
  registradoPor: Partial<Usuario>;
}

export interface Factura {
  id: number;
  total: number;
  saldoPendiente: number;
  mora: number;
  estado: string;
  periodo: string;
  fechaVencimiento: string;
  cliente?: Cliente;
}

export interface Cliente {
  id: number;
  nombres: string;
  apellidos: string;
  identificacion: string;
}

export interface Usuario {
  id: number;
  username: string;
}