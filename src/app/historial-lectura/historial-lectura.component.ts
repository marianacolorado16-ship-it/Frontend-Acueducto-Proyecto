import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HistorialLectura } from '../models/historial-lectura.model';
import { HistorialLecturaService } from '../services/historial-lectura.service';

@Component({
  selector: 'app-historial-lectura',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './historial-lectura.component.html',
  styleUrls: ['./historial-lectura.component.scss']
})
export class HistorialLecturasComponent implements OnInit {
  @Input() lecturaId!: number;
  historial: HistorialLectura[] = [];
  loading: boolean = true;

  constructor(private historialService: HistorialLecturaService) {}

  ngOnInit(): void {
    if (this.lecturaId) {
      this.cargarHistorial();
    }
  }

  cargarHistorial(): void {
    this.loading = true;
    this.historialService.listarPorLectura(this.lecturaId).subscribe({
      next: (data) => {
        this.historial = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error cargando historial de lecturas:', err);
        this.loading = false;
      }
    });
  }
}