import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HistorialLectura } from '../models/historial-lectura.model';
import { environment } from '../../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class HistorialLecturaService {
  private apiUrl = `${environment.apiUrl}/historial-lecturas`;

  constructor(private http: HttpClient) {}

  listarPorLectura(lecturaId: number): Observable<HistorialLectura[]> {
    return this.http.get<HistorialLectura[]>(`${this.apiUrl}/lectura/${lecturaId}`);
  }

  obtenerPorId(id: number): Observable<HistorialLectura> {
    return this.http.get<HistorialLectura>(`${this.apiUrl}/${id}`);
  }
}