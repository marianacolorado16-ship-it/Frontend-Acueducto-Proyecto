import { Pago } from './pago.model';

export interface HistorialPago {
  id: number;
  pago?: Pago;
  fechaEvento: string;
  accion: string; // Ej: CREACION, ANULACION, MODIFICACION
  observacion: string;
  usuarioResponsable: string;
}

export interface Page<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
}