export interface Cliente {
    id?: number;
    codigoCliente: string;
    documento: string;
    nombres: string;
    apellidos: string;
    direccion: string;
    telefono: string;
    email: string;
    estrato: number;
    estado?: string;
    fechaRegistro?: string;
}
