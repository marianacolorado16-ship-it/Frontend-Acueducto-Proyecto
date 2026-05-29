export interface HistorialConsumo {
  id: number;
  clienteId?: number;
  medidorId?: number;
  periodo: string; 
  consumoM3: number;
  promedio3m: number | null;
  promedio6m: number | null;
  createdAt: string;
}