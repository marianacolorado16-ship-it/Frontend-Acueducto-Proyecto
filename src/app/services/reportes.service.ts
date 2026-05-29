import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RecaudoMensual, ConsumoMensual, CarteraEnvejecida, ValorizacionInventario, DashboardEjecutivo } from '../models/reporte.model';

@Injectable({
  providedIn: 'root'
})
export class ReportesService {
  private apiUrl = 'http://localhost:8080/reportes';

  constructor(private http: HttpClient) { }

  getRecaudoMensual(periodo: string): Observable<RecaudoMensual[]> {
    const params = new HttpParams().set('periodo', periodo);
    return this.http.get<RecaudoMensual[]>(`${this.apiUrl}/recaudo`, { params });
  }

  getConsumoMensual(periodo: string): Observable<ConsumoMensual[]> {
    const params = new HttpParams().set('periodo', periodo);
    return this.http.get<ConsumoMensual[]>(`${this.apiUrl}/consumo`, { params });
  }

  getCarteraEnvejecida(): Observable<CarteraEnvejecida> {
    return this.http.get<CarteraEnvejecida>(`${this.apiUrl}/cartera/envejecida`);
  }

  getCarteraVencidaDetallada(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/cartera/vencida-detallada`);
  }

  getValorizacionInventario(): Observable<ValorizacionInventario> {
    return this.http.get<ValorizacionInventario>(`${this.apiUrl}/inventario/valorizacion`);
  }

  getRotacionInventario(periodo: string): Observable<any> {
    const params = new HttpParams().set('periodo', periodo);
    return this.http.get<any>(`${this.apiUrl}/inventario/rotacion`, { params });
  }

  getDashboardEjecutivo(): Observable<DashboardEjecutivo> {
    return this.http.get<DashboardEjecutivo>(`${this.apiUrl}/dashboard`);
  }
}
