import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CuotaFinanciacion } from '../models/cuota-financiacion.model';

@Injectable({
  providedIn: 'root'
})
export class CuotaFinanciacionService {
  private apiUrl = 'http://localhost:8080/cuota-financiacion';

  constructor(private http: HttpClient) {}

  getAll(): Observable<CuotaFinanciacion[]> {
    return this.http.get<CuotaFinanciacion[]>(this.apiUrl);
  }

  getById(id: number): Observable<CuotaFinanciacion> {
    return this.http.get<CuotaFinanciacion>(`${this.apiUrl}/${id}`);
  }

  create(cuota: CuotaFinanciacion): Observable<CuotaFinanciacion> {
    return this.http.post<CuotaFinanciacion>(this.apiUrl, cuota);
  }

  update(id: number, cuota: CuotaFinanciacion): Observable<CuotaFinanciacion> {
    return this.http.put<CuotaFinanciacion>(`${this.apiUrl}/${id}`, cuota);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}