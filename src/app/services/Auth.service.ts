import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Usuario } from '../models/usuario.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
    private url = 'http://localhost:8080';
    // El BehaviorSubject guarda al usuario actual para que otros componentes lo vean
    private userSubject = new BehaviorSubject<Usuario | null>(null);
    user$ = this.userSubject.asObservable();

    constructor(private http: HttpClient) {}

    login(credentials: any): Observable<Usuario> {
    return this.http.post<Usuario>(this.url + '/auth/login', credentials).pipe(
      tap(usuario => {
        // Guardamos en el almacenamiento local del navegador
        localStorage.setItem('usuario_sesion', JSON.stringify(usuario));
        this.userSubject.next(usuario);
      })
    );
  }

  obtenerUsuario(): Usuario | null {
    const userJson = localStorage.getItem('usuario_sesion');
    if (userJson) {
      return JSON.parse(userJson) as Usuario;
    }
    return null;
  }

  getUserRole(): string {
    const user = this.obtenerUsuario();
    return user ? user.rol : ''; // Asumiendo que el modelo Usuario tiene una propiedad 'rol'
  }
}