export enum Rol {
    ADMIN = 'ADMIN',
    OPERADOR = 'OPERADOR',
    PRESIDENTE = 'PRESIDENTE',
    CLIENTE = 'CLIENTE'
}

export interface Usuario {
    id?: number;
    username: string;
    passwordHash?: string;
    email: string;
    nombres: string;
    apellidos: string;
    telefono?: string;
    estado: string;
    rol: Rol;
    clienteId?: number;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface PageUsuario {
    content: Usuario[];
    totalElements: number;
    totalPages: number;
    size: number;
    number: number;
}