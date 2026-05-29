import { Component, OnInit, Input } from '@angular/core';
import { HistorialConsumoService } from '../services/historial-consumo.service';
import { HistorialConsumo } from '../models/historial-consumo.model';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-historial-consumo',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './historial-consumo.component.html',
  styleUrls: ['./historial-consumo.component.scss']
})
export class HistorialConsumoComponent implements OnInit {
  @Input() medidorId?: number;

  historial: HistorialConsumo[] = [];
  loading: boolean = false;
  totalElements: number = 0;

  constructor(private historialService: HistorialConsumoService) {}

  ngOnInit(): void {
    this.cargarDatos();
  }

  cargarDatos(): void {
    if (!this.medidorId) return;
    this.loading = true;
    this.historialService.listarPorMedidor(this.medidorId).subscribe({
      next: (res) => this.procesarRespuesta(res),
      error: (err) => this.handleError(err)
    });
  }

  private procesarRespuesta(res: any): void {
    this.historial = res.content;
    this.totalElements = res.totalElements;
    this.loading = false;
  }

  private handleError(err: any): void {
    console.error('Error cargando historial de consumo', err);
    this.loading = false;
  }
}