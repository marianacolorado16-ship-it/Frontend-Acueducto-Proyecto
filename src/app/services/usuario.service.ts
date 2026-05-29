import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario, PageUsuario } from '../models/usuario.model';
import { environment } from '../../environments/environments';

@Injectable({
    providedIn: 'root'
})
export class UsuarioService {
    private apiUrl = `${environment.apiUrl}/usuarios`;

    constructor(private http: HttpClient) {}

    listar(busqueda: string = '', estado: string = '', page: number = 0, size: number = 10): Observable<PageUsuario> {
        let params = new HttpParams()
        .set('page', page.toString())
        .set('size', size.toString())
        .set('busqueda', busqueda)
        .set('estado', estado);

    return this.http.get<PageUsuario>(this.apiUrl, { params });
    }

    obtenerPorId(id: number): Observable<Usuario> {
        return this.http.get<Usuario>(`${this.apiUrl}/${id}`);
    }

    crear(usuario: Usuario): Observable<Usuario> {
        return this.http.post<Usuario>(this.apiUrl, usuario);
    }

    actualizar(id: number, usuario: Usuario): Observable<Usuario> {
        return this.http.put<Usuario>(`${this.apiUrl}/${id}`, usuario);
    }

    cambiarEstado(id: number, estado: string): Observable<Usuario> {
        return this.http.patch<Usuario>(`${this.apiUrl}/${id}/estado`, { estado });
    }

    desactivar(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }
}
