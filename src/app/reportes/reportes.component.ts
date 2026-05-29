import { Component, OnInit } from '@angular/core';
import { ReportesService } from '../services/reportes.service';
import { DashboardEjecutivo, CarteraEnvejecida } from '../models/reporte.model';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@Component({
  selector: 'app-reportes',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.scss']
})
export class ReportesComponent implements OnInit {
  periodoSeleccionado: string = new Date().toISOString().substring(0, 7); // Formato YYYY-MM
  tipoReporte: string = 'dashboard';
  
  datosDashboard?: DashboardEjecutivo;
  datosCartera?: CarteraEnvejecida;
  listaResultados: any[] = [];
  loading: boolean = false;

  constructor(private reportesService: ReportesService) { }

  ngOnInit(): void {
    this.cargarReporte();
  }

  cargarReporte() {
    this.loading = true;
    switch (this.tipoReporte) {
      case 'dashboard':
        this.reportesService.getDashboardEjecutivo().subscribe(d => { this.datosDashboard = d; this.loading = false; });
        break;
      case 'recaudo':
        this.reportesService.getRecaudoMensual(this.periodoSeleccionado).subscribe(d => { this.listaResultados = d; this.loading = false; });
        break;
      case 'consumo':
        this.reportesService.getConsumoMensual(this.periodoSeleccionado).subscribe(d => { this.listaResultados = d; this.loading = false; });
        break;
      case 'cartera':
        this.reportesService.getCarteraEnvejecida().subscribe(d => { this.datosCartera = d; this.loading = false; });
        break;
      case 'inventario':
        this.reportesService.getValorizacionInventario().subscribe(d => { this.listaResultados = d.items; this.loading = false; });
        break;
    }
  }

  cambiarReporte(tipo: string) {
    this.tipoReporte = tipo;
    this.listaResultados = [];
    this.cargarReporte();
  }
}
