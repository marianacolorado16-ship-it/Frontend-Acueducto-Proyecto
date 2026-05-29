import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { Pago } from '../models/pago.model';
import { HistorialPago } from '../models/historial-pago.model';
import { HistorialPagoService } from '../services/historial-pago.service';

@Component({
  selector: 'app-historial-pago',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './historial-pago.component.html',
  styleUrl: './historial-pago.component.scss'
})
export class HistorialPagoComponent implements OnInit {
  pagos: Pago[] = [];
  auditoriaSeleccionada: HistorialPago[] = []; // Cambiado a HistorialPago (singular)
  pagoEnDetalle: Pago | null = null;
  
  loading = false;
  totalElements = 0;
  filtros = {
    page: 0,
    size: 10,
    clienteId: null,
    facturaId: null
  };

  constructor(private historialService: HistorialPagoService) {}

  ngOnInit(): void {
    this.cargarPagos();
  }

  cargarPagos(): void {
    this.loading = true;
    this.historialService.obtenerPagos(this.filtros).subscribe({
      next: (res) => {
        this.pagos = res.content;
        this.totalElements = res.totalElements;
        this.loading = false;
      },
      error: () => this.loading = false
    });
  }

  verAuditoria(pago: Pago): void {
    this.pagoEnDetalle = pago;
    if (pago.id) {
      this.historialService.obtenerAuditoriaPorPago(pago.id).subscribe({
        next: (data) => {
          this.auditoriaSeleccionada = data;
        }
      });
    }
  }

  cambiarPagina(p: number): void {
    this.filtros.page = p;
    this.cargarPagos();
  }

  cerrarDetalle(): void {
    this.pagoEnDetalle = null;
    this.auditoriaSeleccionada = [];
  }
}