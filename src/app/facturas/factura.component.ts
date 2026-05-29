import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { FacturaService } from '../services/factura.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-factura',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './factura.component.html',
  styleUrls: ['./factura.component.scss']
})
export class FacturaComponent implements OnInit {
  facturaForm!: FormGroup;
  ivaPorcentaje = 0.16;

  constructor(private fb: FormBuilder, private facturaService: FacturaService) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.facturaForm = this.fb.group({
      cliente: ['', Validators.required],
      rfc: ['', [Validators.required, Validators.minLength(12)]],
      fecha: [new Date().toISOString().substring(0, 10)],
      items: this.fb.array([]),
      subtotal: [{ value: 0, disabled: true }],
      iva: [{ value: 0, disabled: true }],
      total: [{ value: 0, disabled: true }]
    });
    this.addItem(); // Empezar con una fila vacía
  }

  get items() {
    return this.facturaForm.get('items') as FormArray;
  }

  addItem() {
    const itemGroup = this.fb.group({
      producto: ['', Validators.required],
      cantidad: [1, [Validators.required, Validators.min(1)]],
      precioUnitario: [0, [Validators.required, Validators.min(0.1)]]
    });
    this.items.push(itemGroup);
  }

  removeItem(index: number) {
    this.items.removeAt(index);
    this.calcularTotales();
  }

  calcularTotales() {
    let subtotal = 0;
    this.items.controls.forEach(control => {
      const cant = control.get('cantidad')?.value || 0;
      const precio = control.get('precioUnitario')?.value || 0;
      subtotal += cant * precio;
    });

    const iva = subtotal * this.ivaPorcentaje;
    const total = subtotal + iva;

    this.facturaForm.patchValue({ subtotal, iva, total });
  }

  guardarFactura() {
    if (this.facturaForm.valid) {
      const payload = this.facturaForm.getRawValue(); // Obtiene valores incluso los disabled
      this.facturaService.crearFactura(payload).subscribe({
        next: (res) => alert('Factura guardada con éxito'),
        error: (err) => console.error('Error al guardar', err)
      });
    }
  }
}