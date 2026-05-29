import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../services/Auth.service';
import { Usuario } from '../models/usuario.model';

@Component({
  selector: 'app-gestion-operador',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './gestion-operador.component.html',
  styleUrls: ['./gestion-operador.component.scss']
})
export class GestionOperadorComponent implements OnInit {
  usuario: Usuario | null = null;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.usuario = this.authService.obtenerUsuario();
    // Seguridad: Si no es operador, redirigir al login
    if (!this.usuario || this.usuario.rol !== 'OPERADOR') {
      this.router.navigate(['/login']);
    }
  }

  cerrarSesion(): void {
    localStorage.removeItem('usuario_sesion');
    this.router.navigate(['/login']);
  }
}