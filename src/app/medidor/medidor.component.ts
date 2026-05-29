import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MedidorService } from '../services/medidor.service';
import { Medidor } from '../models/medidor.model';
import { AuthService } from '../services/Auth.service';

@Component({
  selector: 'app-medidor',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './medidor.component.html',
  styleUrls: ['./medidor.component.scss']
})
export class MedidorComponent implements OnInit {
  medidores: Medidor[] = [];
  medidorForm: FormGroup;
  userRole: string = '';
  loading: boolean = false;
  isEditing: boolean = false;

  constructor(
    private fb: FormBuilder,
    private medidorService: MedidorService,
    private authService: AuthService
  ) {
    this.userRole = this.authService.getUserRole();

    this.medidorForm = this.fb.group({
      id: [null],
      clienteId: ['', Validators.required],
      codigoSerie: ['', [Validators.required, Validators.maxLength(60)]],
      marca: [''],
      modelo: [''],
      diametroPulgadas: [0.5, [Validators.required, Validators.min(0)]],
      lecturaInicial: [0, [Validators.required, Validators.min(0)]],
      fechaInstalacion: [new Date().toISOString().split('T')[0], Validators.required],
      estado: ['ACTIVO', Validators.required],
      ubicacion: ['']
    });
  }

  ngOnInit(): void {
    this.cargarMedidores();
  }

  cargarMedidores() {
    this.loading = true;
    this.medidorService.listarTodos().subscribe({
      next: (data) => {
        this.medidores = data;
        this.loading = false;
      },
      error: () => this.loading = false
    });
  }

  guardarMedidor() {
    if (this.medidorForm.invalid) return;

    const { clienteId, ...formVal } = this.medidorForm.getRawValue();
    const medidorData: Medidor = {
      ...formVal,
      cliente: { id: clienteId }
    };

    if (this.isEditing) {
      this.medidorService.actualizar(formVal.id, medidorData).subscribe({
        next: () => this.finalizarProceso('Medidor actualizado con éxito')
      });
    } else {
      this.medidorService.crear(medidorData).subscribe({
        next: () => this.finalizarProceso('Medidor registrado con éxito')
      });
    }
  }

  editarMedidor(m: Medidor) {
    this.isEditing = true;
    this.medidorForm.patchValue({
      ...m,
      clienteId: m.cliente.id
    });
    window.scrollTo(0, 0);
  }

  eliminarMedidor(id: number) {
    if (confirm('¿Está seguro de eliminar este medidor?')) {
      this.medidorService.eliminar(id).subscribe(() => this.cargarMedidores());
    }
  }

  private finalizarProceso(msg: string) {
    alert(msg);
    this.isEditing = false;
    this.medidorForm.reset({ estado: 'ACTIVO', fechaInstalacion: new Date().toISOString().split('T')[0] });
    this.cargarMedidores();
  }
}