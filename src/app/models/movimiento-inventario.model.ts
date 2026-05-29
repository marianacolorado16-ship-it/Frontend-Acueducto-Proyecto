export interface MovimientoInventario {
  id?: number;
  inventarioId?: number; // Para el POST
  inventario?: any;      // Para la respuesta GET
  tipoMovimiento: 'ENTRADA' | 'SALIDA';
  cantidad: number;
  fechaMovimiento?: string;
  motivo?: string;
  registradoPorId?: number;
}

export interface PageMovimientos {
  content: MovimientoInventario[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
}