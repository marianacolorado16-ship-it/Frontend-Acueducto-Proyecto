import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router, RouterOutlet } from '@angular/router';
import { AuthService } from '../services/Auth.service';
import { Usuario } from '../models/usuario.model';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterOutlet],
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  usuario: Usuario | null = null;
  
  stats = [
    { label: 'Clientes Totales', value: '100', img: 'assets/seguidores.png', color: '#2563eb' },
    { label: 'Medidores Activos', value: '100', img: 'assets/medidor-de-aguas.png', color: '#10b981' },
    { label: 'Consumo Mensual', value: '2,500 m³', img: 'assets/consumo-de-.png', color: '#06b6d4' },
    { label: 'Alertas Pendientes', value: '12', img: 'assets/sirenas.png', color: '#f59e0b' }
  ];

  menuItems = [
    { label: 'Gestión de Clientes', route: 'cliente', img: 'assets/opinion-del-cliente.png', desc: 'Administra la base de datos de abonados.' },
    { label: 'Gestión de Usuarios', route: 'usuario', img: 'assets/gestion-de-equipos.png', desc: 'Controla accesos y roles del sistema.' },
    { label: 'Medidores', route: 'medidor', img: 'assets/medidor-de-agua.png', desc: 'Estado y configuración de dispositivos.' },
    { label: 'Lecturas', route: 'lectura', img: 'assets/prueba-de-lectura.png', desc: 'Registrar y consultar lecturas.' },
    { label: 'Historial de Lecturas', route: 'historial-lectura/1', img: 'assets/reporte-de-salud.png', desc: 'Ver historial de lecturas.' },
    { label: 'Historial de Consumo', route: 'historial-consumo/1', img: 'assets/consumo-de-agua.png', desc: 'Reportes y lecturas históricas.' },
    { label: 'Pagos', route: 'pago', img: 'assets/dinero.png', desc: 'Gestión de pagos de clientes.' },
    { label: 'Historial de Pagos', route: 'historial-pago', img: 'assets/historial-de-transacciones.png', desc: 'Consulta de pagos realizados.' },
    { label: 'Facturas', route: 'factura', img: 'assets/facturacion.png', desc: 'Gestión y emisión de facturas.' },
    { label: 'Detalle de Factura', route: 'detalle-factura', img: 'assets/en-linea.png', desc: 'Detalle de facturación.' },
    { label: 'Financiación', route: 'financiacion', img: 'assets/inversion.png', desc: 'Planes de financiación.' },
    { label: 'Cuotas de Financiación', route: 'cuota-financiacion', img: 'assets/moneda-de-un-dolar.png', desc: 'Gestión de cuotas de financiación.' },
    { label: 'Inventario', route: 'inventario', img: 'assets/gestion-de-materiales.png', desc: 'Gestión de inventario.' },
    { label: 'Movimientos de Inventario', route: 'movimiento-inventario', img: 'assets/cadena-de-suministro.png', desc: 'Registro de movimientos de inventario.' },
    { label: 'Reportes', route: 'reportes', img: 'assets/reporte.png', desc: 'Reportes y estadísticas.' },
    { label: 'Turnos', route: 'turnos', img: 'assets/giratorio.png', desc: 'Gestión de turnos.' },
    { label: 'Auditoría', route: 'auditoria', img: 'assets/auditoria.png', desc: 'Registro de auditoría del sistema.' }
  ];

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.usuario = this.authService.obtenerUsuario();
    if (!this.usuario) {
      this.router.navigate(['/login']);
    }
  }

  cerrarSesion(): void {
    localStorage.removeItem('usuario_sesion');
    this.router.navigate(['/login']);
  }
}