import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environments';

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

@Injectable({
    providedIn: 'root'
})
export class UsuarioService {
    private readonly apiUrl = `${environment.apiUrl}/usuarios`;

    constructor(private http: HttpClient) {}

  // GET /usuarios (Paginado y con filtros)
    listar(
        page: number = 0,
        size: number = 10,
        sort: string = 'id',
        dir: string = 'asc',
        busqueda?: string,
        
        estado?: string
    ): Observable<any> {
        let params = new HttpParams()
        .set('page', page.toString())
        .set('size', size.toString())
        .set('sort', sort)
        .set('dir', dir);

    if (busqueda) params = params.set('q', busqueda);
    if (estado) params = params.set('estado', estado);

    return this.http.get<any>(this.apiUrl, { params });
    }

    // GET /usuarios/{id}
    obtenerPorId(id: number): Observable<Usuario> {
        return this.http.get<Usuario>(`${this.apiUrl}/${id}`);
    }

    // POST /usuarios
    crear(usuario: Usuario): Observable<Usuario> {
        return this.http.post<Usuario>(this.apiUrl, usuario);
    }

    // PUT /usuarios/{id}
    actualizar(id: number, usuario: Usuario): Observable<Usuario> {
        return this.http.put<Usuario>(`${this.apiUrl}/${id}`, usuario);
    }

    // PATCH /usuarios/{id}/estado?estado=...
    cambiarEstado(id: number, estado: string): Observable<Usuario> {
        const params = new HttpParams().set('estado', estado);
        return this.http.patch<Usuario>(`${this.apiUrl}/${id}/estado`, {}, { params });
    }

    // DELETE /usuarios/{id} (Desactiva al usuario)
    eliminar(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }
}
