import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Medidor } from '../models/medidor.model';
import { environment } from '../../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class MedidorService {
  private apiUrl = `${environment.apiUrl}/medidores`;

  constructor(private http: HttpClient) { }

  listarTodos(): Observable<Medidor[]> {
    return this.http.get<Medidor[]>(this.apiUrl);
  }

  obtenerPorId(id: number): Observable<Medidor> {
    return this.http.get<Medidor>(`${this.apiUrl}/${id}`);
  }

  crear(medidor: Medidor): Observable<Medidor> {
    return this.http.post<Medidor>(this.apiUrl, medidor);
  }

  actualizar(id: number, medidor: Medidor): Observable<Medidor> {
    return this.http.put<Medidor>(`${this.apiUrl}/${id}`, medidor);
  }

  eliminar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}