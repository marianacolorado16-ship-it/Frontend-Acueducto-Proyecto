import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class HistorialConsumoService {
  private apiUrl = `${environment.apiUrl}/api/historial-consumo`;

  constructor(private http: HttpClient) {}

  listarPorMedidor(medidorId: number, page: number = 0, size: number = 12): Observable<any> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString())
      .set('sort', 'periodo,desc'); // Ordenar por periodo más reciente según el backend
    
    return this.http.get(`${this.apiUrl}/medidor/${medidorId}`, { params });
  }
}