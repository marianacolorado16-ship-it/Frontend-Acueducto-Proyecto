import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component'; 
import { LoginComponent } from './login/login.component';
import { AdminComponent } from './dashboard-admin/admin.component';
import { ClienteComponent } from './cliente/cliente.component';
import { LecturasComponent } from './lectura/lectura.component';
import { MedidorComponent } from './medidor/medidor.component';
import { HistorialLecturasComponent } from './historial-lectura/historial-lectura.component';
import { HistorialConsumoComponent } from './historial-consumo/historial-consumo.component';
import { PagoComponent } from './pago/pago.component';
import { HistorialPagoComponent } from './historial-pago/historial-pago.component';
import { FacturaComponent } from './facturas/factura.component';
import { DetalleFacturaComponent } from './detalle-factura/detalle-factura.component';
import { FinanciacionComponent } from './financiación/financiacion.component';
import { AuditoriaComponent } from './auditoria/auditoria.component';
import { CuotaFinanciacionComponent } from './cuota-financiacion/cuota-financiacion.component';
import { InventarioComponent } from './inventario/inventario.component';
import { MovimientoInventarioComponent } from './movimiento-inventario/movimiento-inventario.component';
import { ReportesComponent } from './reportes/reportes.component';
import { TurnoComponent } from './Turno/turno.component';
import { UsuarioComponent } from './usuario/usuario.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  
  { path: 'home', component: HomeComponent },
  
  { path: 'login', component: LoginComponent },

  {
    path: 'dashboard-admin',
    component: AdminComponent,
    children: [
      { path: 'lectura', component: LecturasComponent },
      { path: 'medidor', component: MedidorComponent },
      { path: 'historial-lectura/:lecturaId', component: HistorialLecturasComponent },
      { path: 'historial-consumo/:medidorId', component: HistorialConsumoComponent },
      { path: 'cliente', component: ClienteComponent },
      { path: 'usuario', component: UsuarioComponent },
      { path: 'pago', component: PagoComponent },
      { path: 'historial-pago', component: HistorialPagoComponent },
      { path: 'factura', component: FacturaComponent },
      { path: 'detalle-factura', component: DetalleFacturaComponent },
      { path: 'financiacion', component: FinanciacionComponent },
      { path: 'auditoria', component: AuditoriaComponent },
      { path: 'cuota-financiacion', component: CuotaFinanciacionComponent },
      { path: 'inventario', component: InventarioComponent },
      { path: 'movimiento-inventario', component: MovimientoInventarioComponent },
      { path: 'reportes', component: ReportesComponent },
      { path: 'turnos', component: TurnoComponent },
    ],
  },
  { path: '**', redirectTo: 'home' }
];