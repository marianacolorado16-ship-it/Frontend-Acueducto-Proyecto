import { Medidor } from '../models/medidor.model';
import { Usuario } from './usuario.model';

export interface Lectura {
  id?: number;
  medidor: Partial<Medidor>;
  periodo: string; // Formato YYYY-MM
  fechaLectura: string | Date;
  lecturaAnterior: number;
  lecturaActual: number;
  consumoM3: number;
  observacion?: string;
  registradoPor?: Partial<Usuario>;
  createdAt?: string;
}