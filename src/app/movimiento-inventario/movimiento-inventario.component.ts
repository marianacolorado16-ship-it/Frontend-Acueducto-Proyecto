import { Component, OnInit } from '@angular/core';
import { MovimientoInventarioService } from '../services/movimiento-inventario.service';
import { MovimientoInventario } from '../models/movimiento-inventario.model';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@Component({
  selector: 'app-movimiento-inventario',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './movimiento-inventario.component.html',
  styleUrls: ['./movimiento-inventario.component.scss']
})
export class MovimientoInventarioComponent implements OnInit {
  movimientos: MovimientoInventario[] = [];
  loading: boolean = false;
  totalElements: number = 0;
  page: number = 0;
  
  // Modelo para nuevo movimiento
  nuevoMovimiento: MovimientoInventario = {
    tipoMovimiento: 'ENTRADA',
    cantidad: 0,
    inventarioId: undefined,
    motivo: ''
  };

  constructor(private movimientoService: MovimientoInventarioService) { }

  ngOnInit(): void {
    this.cargarMovimientos();
  }

  cargarMovimientos(): void {
    this.loading = true;
    this.movimientoService.listar(undefined, this.page).subscribe(response => {
      this.movimientos = response.content;
      this.totalElements = response.totalElements;
      this.loading = false;
    });
  }

  guardarMovimiento(): void {
    this.movimientoService.registrar(this.nuevoMovimiento).subscribe(() => {
      alert('Movimiento registrado con éxito');
      this.page = 0;
      this.cargarMovimientos();
    });
  }
}