import { Cliente } from './cliente.model';

export interface Medidor {
  id?: number;
  cliente: Partial<Cliente>;
  codigoSerie: string;
  marca?: string;
  modelo?: string;
  diametroPulgadas?: number;
  lecturaInicial: number;
  fechaInstalacion: string; // LocalDate en backend
  estado: string;           // ACTIVO, INACTIVO, REPARACION
  ubicacion?: string;
  createdAt?: string;
  updatedAt?: string;
}