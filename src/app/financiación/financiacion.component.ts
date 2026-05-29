import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FinanciacionService } from '../services/financiacion.service';
import { Financiacion } from '../models/financiacion.model';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-financiacion',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './financiacion.component.html',
  styleUrls: ['./financiacion.component.scss']
})
export class FinanciacionComponent implements OnInit {
  financiacionForm!: FormGroup;
  financiaciones: Financiacion[] = [];
  cargando = false;
  tiposFinanciacion = ['ACUEDUCTO', 'ALCANTARILLADO', 'OTROS'];

  constructor(
    private fb: FormBuilder,
    private financiacionService: FinanciacionService
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.cargarFinanciaciones();
  }

  initForm() {
    this.financiacionForm = this.fb.group({
      clienteId: [null, Validators.required],
      montoInicial: [0, [Validators.required, Validators.min(1)]],
      interesMensual: [0.02, [Validators.required, Validators.min(0)]],
      numeroCuotas: [12, [Validators.required, Validators.min(1)]],
      fechaInicio: [new Date().toISOString().substring(0, 10), Validators.required],
      tipo: ['OTROS', Validators.required]
    });
  }

  cargarFinanciaciones() {
    this.cargando = true;
    this.financiacionService.listar().subscribe({
      next: (data) => {
        this.financiaciones = data.content;
        this.cargando = false;
      },
      error: () => this.cargando = false
    });
  }

  guardar() {
    if (this.financiacionForm.valid) {
      const raw = this.financiacionForm.value;
      const payload: Financiacion = {
        cliente: { id: raw.clienteId },
        montoInicial: raw.montoInicial,
        interesMensual: raw.interesMensual,
        numeroCuotas: raw.numeroCuotas,
        fechaInicio: raw.fechaInicio,
        tipo: raw.tipo
      };
      this.financiacionService.crear(payload).subscribe({
        next: () => {
          alert('Financiación creada con éxito');
          this.cargarFinanciaciones();
          this.financiacionForm.reset({ interesMensual: 0.02, numeroCuotas: 12, tipo: 'OTROS', fechaInicio: new Date().toISOString().substring(0, 10)});
        },
        error: (err) => {
          console.error('Error al registrar financiación:', err); // Log detallado del error
          alert('Error: ' + (err.error?.message || 'Error al conectar con el servidor. Por favor, revisa la consola para más detalles.'));
        }
      });
    }
  }
}