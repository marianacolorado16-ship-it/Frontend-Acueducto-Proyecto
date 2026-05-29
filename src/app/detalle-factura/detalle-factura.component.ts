import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { DetalleFacturaService } from '../services/detalle-factura.service';
import { DetalleFactura } from '../models/detalle-factura.model';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-detalle-factura',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './detalle-factura.component.html',
  styleUrls: ['./detalle-factura.component.scss']
})
export class DetalleFacturaComponent implements OnInit, OnChanges {
  @Input() facturaId?: number;
  detalles: DetalleFactura[] = [];
  cargando = false;
  error = '';

  constructor(private detalleService: DetalleFacturaService) { }

  ngOnInit(): void {
    if (this.facturaId) {
      this.cargarDetalles();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['facturaId'] && !changes['facturaId'].firstChange) {
      this.cargarDetalles();
    }
  }

  cargarDetalles(): void {
    if (!this.facturaId) return;
    this.cargando = true;
    this.detalleService.listarPorFactura(this.facturaId).subscribe({
      next: (data) => {
        this.detalles = data;
        this.cargando = false;
      },
      error: () => {
        this.error = 'No se pudieron cargar los conceptos de la factura.';
        this.cargando = false;
      }
    });
  }
}