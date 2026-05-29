import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Auditoria } from '../models/auditoria.model';

@Injectable({
  providedIn: 'root'
})
export class AuditoriaService {
  private apiUrl = 'http://localhost:8080/api/auditoria'; // Ajusta a tu endpoint

  constructor(private http: HttpClient) { }

  // Obtener todos los logs (opcionalmente filtrados)
  getLogs(filtros?: any): Observable<Auditoria[]> {
    let params = new HttpParams();
    if (filtros) {
      if (filtros.usuario) params = params.set('usuario', filtros.usuario);
      if (filtros.accion) params = params.set('accion', filtros.accion);
    }
    return this.http.get<Auditoria[]>(this.apiUrl, { params });
  }

  // Opcional: Obtener auditoría de un registro específico
  getAuditById(id: number): Observable<Auditoria> {
    return this.http.get<Auditoria>(`${this.apiUrl}/${id}`);
  }
}