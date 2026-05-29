export interface DetalleFactura {
  id?: number;
  facturaId?: number;
  descripcion: string;
  cantidad: number;
  precioUnitario: number;
  subtotal: number;
}