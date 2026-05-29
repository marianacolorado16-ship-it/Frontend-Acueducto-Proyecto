import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/Auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Usuario } from '../models/usuario.model';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  // Objeto que se vincula al formulario del HTML
  datos = {
    username: '',
    password: ''
  };

  constructor(private authService: AuthService, private router: Router) {}

  iniciarSesion() {
    console.log('Intentando login con:', this.datos);
    this.authService.login(this.datos).subscribe({
      next: (user: Usuario) => {
        console.log('Respuesta del backend:', user);
        if (!user || !user.rol) {
          alert('Error: El backend no devolvió un usuario válido.');
          return;
        }
        switch (user.rol) {
          case 'ADMIN':
            this.router.navigate(['/dashboard-admin']);
            break;
          case 'PRESIDENTE':
            this.router.navigate(['/inicio-presidente']);
            break;
          case 'OPERADOR':
            this.router.navigate(['/gestion-operador']);
            break;
          case 'CLIENTE':
            this.router.navigate(['/mi-cuenta-cliente']);
            break;
          default:
            this.router.navigate(['/home']);
        }
      },
      error: (err: HttpErrorResponse) => {
        console.error('Error de autenticación:', err);
        if (err.error) {
          alert('Error backend: ' + JSON.stringify(err.error));
        } else {
          alert('Error: Usuario o contraseña incorrectos');
        }
      }
    });
  }
}