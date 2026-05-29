export interface HistorialLectura {
  id: number;
  lecturaId: number;
  accion: string;
  valorAnterior: number | null;
  valorNuevo: number | null;
  motivo: string;
  usuarioId: number;
  usuarioNombre?: string; // Para mostrar quién realizó el cambio
  fechaEvento: string;
}