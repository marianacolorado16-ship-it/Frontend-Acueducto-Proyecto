import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Pago, Factura } from '../models/pago.model';
import { PagoService } from '../services/pago.service';

@Component({
  selector: 'app-pago',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './pago.component.html',
  styleUrl: './pago.component.scss'
})
export class PagoComponent implements OnInit {
  pagoForm: FormGroup;
  pagos: Pago[] = [];
  facturasVencidas: Factura[] = [];
  loading = false;
  error: string | null = null;

  constructor(
    private fb: FormBuilder,
    private pagoService: PagoService
  ) {
    this.pagoForm = this.fb.group({
      facturaId: ['', Validators.required],
      monto: ['', [Validators.required, Validators.min(1)]],
      metodoPago: ['EFECTIVO', Validators.required],
      referencia: [''],
      registradoPorId: [1, Validators.required] // Ejemplo: ID del usuario logueado
    });
  }

  ngOnInit(): void {
    this.cargarPagos();
    this.cargarCarteraVencida();
  }

  cargarPagos(): void {
    this.pagoService.listarPagos().subscribe({
      next: (data) => this.pagos = data.content,
      error: (err) => this.error = 'Error al cargar pagos'
    });
  }

  cargarCarteraVencida(): void {
    this.pagoService.obtenerCarteraVencida().subscribe({
      next: (data) => this.facturasVencidas = data,
      error: (err) => this.error = 'Error al cargar cartera'
    });
  }

  onSubmit(): void {
    if (this.pagoForm.invalid) return;

    this.loading = true;
    const formVal = this.pagoForm.value;

    const nuevoPago: Pago = {
      monto: formVal.monto,
      metodoPago: formVal.metodoPago,
      referencia: formVal.referencia,
      factura: { id: formVal.facturaId },
      registradoPor: { id: formVal.registradoPorId }
    };

    this.pagoService.registrarPago(nuevoPago).subscribe({
      next: () => {
        this.pagoForm.reset({ metodoPago: 'EFECTIVO', registradoPorId: 1 });
        this.cargarPagos();
        this.cargarCarteraVencida();
        this.loading = false;
        alert('Pago registrado con éxito');
      },
      error: (err) => {
        this.error = err.error?.message || 'Error al registrar el pago';
        this.loading = false;
      }
    });
  }
}