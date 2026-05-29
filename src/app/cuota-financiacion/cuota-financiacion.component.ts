import { Component, OnInit } from '@angular/core';
import { CuotaFinanciacionService } from '../services/cuota-financiacion.service';
import { CuotaFinanciacion } from '../models/cuota-financiacion.model';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-cuota-financiacion',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './cuota-financiacion.component.html',
  styleUrls: ['./cuota-financiacion.component.scss']
})
export class CuotaFinanciacionComponent implements OnInit {
  cuotas: CuotaFinanciacion[] = [];
  selectedCuota?: CuotaFinanciacion;

  constructor(private cuotaService: CuotaFinanciacionService) {}

  ngOnInit(): void {
    this.cuotaService.getAll().subscribe(data => this.cuotas = data);
  }

  seleccionarCuota(cuota: CuotaFinanciacion) {
    this.selectedCuota = cuota;
  }
}