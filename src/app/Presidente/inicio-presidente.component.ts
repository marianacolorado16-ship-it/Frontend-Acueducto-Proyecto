import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../services/Auth.service';
import { Usuario } from '../models/usuario.model';

@Component({
  selector: 'app-inicio-presidente',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './inicio-presidente.component.html',
  styleUrls: ['./inicio-presidente.component.scss']
})
export class InicioPresidenteComponent implements OnInit {
  usuario: Usuario | null = null;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.usuario = this.authService.obtenerUsuario();
    if (!this.usuario || this.usuario.rol !== 'PRESIDENTE') {
      this.router.navigate(['/login']);
    }
  }

  cerrarSesion(): void {
    localStorage.removeItem('usuario_sesion');
    this.router.navigate(['/login']);
  }
}