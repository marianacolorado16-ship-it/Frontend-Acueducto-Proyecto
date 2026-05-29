import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LecturaService } from '../services/lectura.service';
import { Lectura } from '../models/lectura.model';
import { AuthService } from '../services/Auth.service';

@Component({
  selector: 'app-lecturas',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './lectura.component.html',
  styleUrls: ['./lectura.component.scss']
})
export class LecturasComponent implements OnInit {
  lecturas: Lectura[] = [];
  userRole: string = '';
  loading: boolean = false;
  
  // Variables para el formulario de registro (Operador/Admin)
  nuevaLectura: Lectura = {
    medidor: { id: 0 },
    periodo: '',
    fechaLectura: new Date().toISOString().split('T')[0],
    lecturaAnterior: 0,
    lecturaActual: 0,
    consumoM3: 0
  };

  constructor(
    private lecturaService: LecturaService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.userRole = this.authService.getUserRole(); // ADMIN, PRESIDENTE, OPERADOR
    this.cargarLecturas();
  }

  cargarLecturas(): void {
    this.loading = true;
    this.lecturaService.listarLecturas().subscribe({
      next: (data) => {
        this.lecturas = data;
        this.loading = false;
      },
      error: (err) => console.error(err)
    });
  }

  calcularConsumo(): void {
    this.nuevaLectura.consumoM3 = this.nuevaLectura.lecturaActual - this.nuevaLectura.lecturaAnterior;
  }

  guardarLectura(): void {
    this.calcularConsumo(); // Asegurar cálculo antes de enviar
    this.lecturaService.registrarLectura(this.nuevaLectura).subscribe({
      next: () => {
        this.cargarLecturas();
        alert('Lectura registrada con éxito');
      }
    });
  }
}