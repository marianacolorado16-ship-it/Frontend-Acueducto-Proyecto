import { Component, OnInit } from '@angular/core';
import { AuditoriaService } from '../services/auditoria.service';
import { Auditoria } from '../models/auditoria.model';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@Component({
  selector: 'app-auditoria',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './auditoria.component.html',
  styleUrls: ['./auditoria.component.scss']
})
export class AuditoriaComponent implements OnInit {
  logs: Auditoria[] = [];
  logsFiltrados: Auditoria[] = [];
  cargando: boolean = true;
  filtroTexto: string = '';

  constructor(private auditoriaService: AuditoriaService) { }

  ngOnInit(): void {
    this.cargarAuditoria();
  }

  cargarAuditoria(): void {
    this.cargando = true;
    this.auditoriaService.getLogs().subscribe({
      next: (data) => {
        this.logs = data;
        this.logsFiltrados = data;
        this.cargando = false;
      },
      error: (err) => {
        console.error('Error al cargar logs', err);
        this.cargando = false;
      }
    });
  }

  aplicarFiltro(): void {
    const busqueda = this.filtroTexto.toLowerCase();
    this.logsFiltrados = this.logs.filter(log => 
      log.usuario.toLowerCase().includes(busqueda) ||
      log.accion.toLowerCase().includes(busqueda) ||
      log.modulo.toLowerCase().includes(busqueda) ||
      log.descripcion.toLowerCase().includes(busqueda)
    );
  }

  getBadgeClass(accion: string): string {
    if (accion.includes('ELIMINAR')) return 'bg-danger';
    if (accion.includes('EDITAR') || accion.includes('ACTUALIZAR')) return 'bg-warning text-dark';
    if (accion.includes('CREAR')) return 'bg-success';
    return 'bg-info text-dark';
  }
}