import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Inventario } from '../models/inventario.model';

@Injectable({
  providedIn: 'root'
})
export class InventarioService {
  private apiUrl = 'http://localhost:8080/inventario';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Inventario[]> {
    return this.http.get<Inventario[]>(this.apiUrl);
  }

  getById(id: number): Observable<Inventario> {
    return this.http.get<Inventario>(`${this.apiUrl}/${id}`);
  }

  create(item: Inventario): Observable<Inventario> {
    return this.http.post<Inventario>(this.apiUrl, item);
  }

  update(id: number, item: Inventario): Observable<Inventario> {
    return this.http.put<Inventario>(`${this.apiUrl}/${id}`, item);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}