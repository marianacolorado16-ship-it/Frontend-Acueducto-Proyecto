import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DetalleFactura } from '../models/detalle-factura.model';

@Injectable({
  providedIn: 'root'
})
export class DetalleFacturaService {
  private apiUrl = 'http://localhost:8080/detalles-factura';

  constructor(private http: HttpClient) { }

  listarPorFactura(facturaId: number): Observable<DetalleFactura[]> {
    return this.http.get<DetalleFactura[]>(`${this.apiUrl}/factura/${facturaId}`);
  }

  obtenerPorId(id: number): Observable<DetalleFactura> {
    return this.http.get<DetalleFactura>(`${this.apiUrl}/${id}`);
  }
}