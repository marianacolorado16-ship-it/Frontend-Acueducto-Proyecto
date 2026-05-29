export interface Turno {
    id?: number;
    fechaTurno: string; // Formato YYYY-MM-DD
    horaInicio: string; // Formato HH:mm:ss
    horaFin: string;    // Formato HH:mm:ss
    estado?: string;    // PROGRAMADO, COMPLETADO, etc.
    operador: {
        id: number;
        username?: string;
        nombres?: string;
        apellidos?: string;
    };
}

export type EstadoTurno = 'PROGRAMADO' | 'EN_PROGRESO' | 'COMPLETADO' | 'CANCELADO';