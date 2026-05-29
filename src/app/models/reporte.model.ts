export interface RecaudoMensual {
  clienteId: number;
  clienteNombre: string;
  totalFacturado: number;
  totalPagado: number;
  saldoPendiente: number;
  facturasEmitidas: number;
  pagosRealizados: number;
}

export interface ConsumoMensual {
  medidorId: number;
  clienteId: number;
  clienteNombre: string;
  numeroMedidor: string;
  consumoM3: number;
  promedio3Meses: number;
  promedio6Meses: number;
}

export interface CarteraEnvejecida {
  cuentas0_30Dias: number;
  monto0_30Dias: number;
  cuentas30_60Dias: number;
  monto30_60Dias: number;
  cuentas60_90Dias: number;
  monto60_90Dias: number;
  cuentas90PlusDias: number;
  monto90PlusDias: number;
  totalCuentasVencidas: number;
  totalMontoVencido: number;
}

export interface ValorizacionInventario {
  valorTotalInventario: number;
  itemsActivos: number;
  itemsBajoStock: number;
  items: any[];
}

export interface DashboardEjecutivo {
  recaudoMes: number;
  carteraPendiente: number;
  clientesActivos: number;
  consumoPromedio: number;
  inventarioItemsBajoStock: number;
  valorInventario: number;
}
