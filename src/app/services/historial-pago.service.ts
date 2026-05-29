import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pago, Page } from '../models/pago.model';
import { HistorialPago } from '../models/historial-pago.model';

@Injectable({
  providedIn: 'root'
})
export class HistorialPagoService {
  private urlPagos = 'http://localhost:8080/pagos';
  private urlHistorial = 'http://localhost:8080/historial-pagos';

  constructor(private http: HttpClient) { }

  // Obtiene la lista de pagos con filtros (Cliente, Factura) y paginación
  obtenerPagos(filtros: any): Observable<Page<Pago>> {
    let params = new HttpParams()
      .set('page', filtros.page || 0)
      .set('size', filtros.size || 10)
      .set('sort', filtros.sort || 'fechaPago')
      .set('dir', filtros.dir || 'desc');

    if (filtros.clienteId) params = params.set('clienteId', filtros.clienteId);
    if (filtros.facturaId) params = params.set('facturaId', filtros.facturaId);

    return this.http.get<Page<Pago>>(this.urlPagos, { params });
  }

  // Obtiene la bitácora de auditoría de un pago específico (HistorialPagosController)
  obtenerAuditoriaPorPago(pagoId: number): Observable<HistorialPago[]> {
    return this.http.get<HistorialPago[]>(`${this.urlHistorial}/pago/${pagoId}`);
  }
}