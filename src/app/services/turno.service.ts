import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Turno } from '../models/turno.model';
import { environment } from '../../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class TurnoService {
  private readonly API_URL = `${environment.apiUrl}/turnos`;

  constructor(private http: HttpClient) {}

  listar(operadorId?: number, estado?: string, page: number = 0, size: number = 10): Observable<any> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

    if (operadorId) params = params.set('operadorId', operadorId.toString());
    if (estado) params = params.set('estado', estado);

    return this.http.get<any>(this.API_URL, { params });
  }

  crearTurno(turno: Turno): Observable<Turno> {
    return this.http.post<Turno>(this.API_URL, turno);
  }

  obtenerPorId(id: number): Observable<Turno> {
    return this.http.get<Turno>(`${this.API_URL}/${id}`);
  }
}