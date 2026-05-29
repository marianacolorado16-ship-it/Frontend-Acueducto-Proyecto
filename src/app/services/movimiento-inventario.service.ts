import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MovimientoInventario, PageMovimientos } from '../models/movimiento-inventario.model';

@Injectable({
  providedIn: 'root'
})
export class MovimientoInventarioService {
  private apiUrl = 'http://localhost:8080/movimientos-inventario';

  constructor(private http: HttpClient) { }

  listar(inventarioId?: number, page: number = 0, size: number = 10): Observable<PageMovimientos> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString())
      .set('sort', 'fechaMovimiento')
      .set('dir', 'desc');

    if (inventarioId) {
      params = params.set('inventarioId', inventarioId.toString());
    }
    return this.http.get<PageMovimientos>(this.apiUrl, { params });
  }

  registrar(movimiento: MovimientoInventario): Observable<MovimientoInventario> {
    return this.http.post<MovimientoInventario>(this.apiUrl, movimiento);
  }
}
