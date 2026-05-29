import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TurnoService } from '../services/turno.service';
import { Turno } from '../models/turno.model';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-turno',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './turno.component.html',
  styleUrls: ['./turno.component.scss']
})
export class TurnoComponent implements OnInit {
  turnoForm: FormGroup;
  turnos: Turno[] = [];
  loading = false;

  constructor(
    private fb: FormBuilder,
    private turnoService: TurnoService
  ) {
    this.turnoForm = this.fb.group({
      fechaTurno: ['', Validators.required],
      horaInicio: ['', Validators.required],
      horaFin: ['', Validators.required],
      operadorId: [null, Validators.required],
      estado: ['PROGRAMADO']
    });
  }

  ngOnInit(): void {
    this.cargarTurnos();
  }

  cargarTurnos(): void {
    this.loading = true;
    this.turnoService.listar().subscribe({
      next: (data) => {
        this.turnos = data.content;
        this.loading = false;
      },
      error: (err) => console.error('Error al cargar turnos', err)
    });
  }

  guardarTurno(): void {
    if (this.turnoForm.invalid) return;

    const formValue = this.turnoForm.value;
    const request: Turno = {
      ...formValue,
      operador: { id: formValue.operadorId }
    };

    this.turnoService.crearTurno(request).subscribe({
      next: () => {
        alert('Turno programado correctamente');
        this.turnoForm.reset({ estado: 'PROGRAMADO' });
        this.cargarTurnos();
      },
      error: (err) => alert(err.error?.message || 'Error al crear turno')
    });
  }
}