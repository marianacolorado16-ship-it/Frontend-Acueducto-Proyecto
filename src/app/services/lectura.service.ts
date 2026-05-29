import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Lectura } from '../models/lectura.model';

@Injectable({
  providedIn: 'root'
})
export class LecturaService {
  private apiUrl = 'http://localhost:8080/api/lecturas';

  constructor(private http: HttpClient) {}

  listarLecturas(): Observable<Lectura[]> {
    return this.http.get<Lectura[]>(this.apiUrl);
  }

  obtenerPorPeriodo(periodo: string): Observable<Lectura[]> {
    return this.http.get<Lectura[]>(`${this.apiUrl}/periodo/${periodo}`);
  }

  registrarLectura(lectura: Lectura): Observable<Lectura> {
    return this.http.post<Lectura>(this.apiUrl, lectura);
  }
}