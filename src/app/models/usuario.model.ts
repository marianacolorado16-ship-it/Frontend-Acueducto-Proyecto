export interface Rol {
    id: number;
    nombre?: string;
    descripcion?: string;
}

export interface Usuario {
    id?: number;
    username: string;
    email: string;
    passwordHash?: string;
    estado?: string;
    roles: Rol[];
}