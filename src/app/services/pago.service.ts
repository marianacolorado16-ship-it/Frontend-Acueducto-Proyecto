import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pago, Factura, Page } from '../models/pago.model';

@Injectable({
  providedIn: 'root'
})
export class PagoService {
  private apiUrl = 'http://localhost:8080/pagos';

  constructor(private http: HttpClient) { }

  registrarPago(pago: Pago): Observable<Pago> {
    return this.http.post<Pago>(this.apiUrl, pago);
  }

  listarPagos(
    facturaId?: number, 
    clienteId?: number, 
    page: number = 0, 
    size: number = 10, 
    sort: string = 'fechaPago', 
    dir: string = 'desc'
  ): Observable<Page<Pago>> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString())
      .set('sort', sort)
      .set('dir', dir);

    if (facturaId) params = params.set('facturaId', facturaId.toString());
    if (clienteId) params = params.set('clienteId', clienteId.toString());

    return this.http.get<Page<Pago>>(this.apiUrl, { params });
  }

  obtenerCarteraVencida(): Observable<Factura[]> {
    return this.http.get<Factura[]>(`${this.apiUrl}/cartera-vencida`);
  }
}