export interface Financiacion {
  id?: number;
  cliente: { id: number };
  montoInicial: number;
  interesMensual: number;
  numeroCuotas: number;
  fechaInicio?: string;
  tipo: string;
  estado?: string;
  saldoActual?: number;
}

export interface CuotaFinanciacion {
  id?: number;
  financiacionId?: number;
  numeroCuota: number;
  fechaVencimiento: string;
  valorCuota: number;
  valorPagado: number;
  saldoCuota: number;
  estado: string;
}