import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Financiacion } from '../models/financiacion.model';

@Injectable({
  providedIn: 'root'
})
export class FinanciacionService {
  private apiUrl = 'http://localhost:8080/financiaciones';

  constructor(private http: HttpClient) { }

  crear(financiacion: Financiacion): Observable<Financiacion> {
    return this.http.post<Financiacion>(this.apiUrl, financiacion);
  }

  obtenerPorId(id: number): Observable<Financiacion> {
    return this.http.get<Financiacion>(`${this.apiUrl}/${id}`);
  }

  listar(clienteId?: number, page: number = 0, size: number = 10): Observable<any> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());
    if (clienteId) params = params.set('clienteId', clienteId.toString());
    return this.http.get<any>(this.apiUrl, { params });
  }
}