import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NavigationService } from '../navigation.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit, OnDestroy {
  readonly navLinks = [
    { label: 'Inicio', route: '/home'},
    { label: 'Clientes', route: '/cliente'},
    { label: 'Usuarios', route: '/usuario'}
  ];

  readonly currentYear = new Date().getFullYear();

  readonly images: string[] = [
    '../../assets/fondo.jpg',  // Nombre exacto de tu primera imagen
    '../../assets/fondo2.jpg', // Nombre exacto de tu segunda imagen
    '../../assets/fondo3.jpg'  // Puedes añadir todas las que quieras
  ];

  currentIndex: number = 0;
  private intervalId: any;

  constructor(private navigationService: NavigationService) {}

  @HostListener('window:scroll', [])
  onWindowScroll() {
    // Lista completa de IDs definidos en tu HTML
    const sections = [
      'inicio', 
      'conocenos', 
      'beneficios', 
      'servicios-detallados', 
      'como-funciona', 
      'planes', 
      'nuestros-servicios', 
      'contacto'
    ];
    let currentSection = 'inicio';

    for (const sectionId of sections) {
      const element = document.getElementById(sectionId);
      if (element) {
        const rect = element.getBoundingClientRect();
        // Si la sección ya cruzó el umbral de los 200px desde arriba
        if (rect.top <= 200) {
          currentSection = sectionId;
        }
      }
    }
    this.navigationService.setActiveSection(currentSection);
  }

  ngOnInit() {
    // Cambia la imagen cada 5 segundos
    this.intervalId = setInterval(() => {
      this.currentIndex = (this.currentIndex + 1) % this.images.length;
    }, 5000);
  }

  ngOnDestroy() {
    // Limpiamos el intervalo cuando el usuario sale de la página para evitar fugas de memoria
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  // Getter para construir el estilo del fondo dinámicamente
  get currentBg() {
    return `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('${this.images[this.currentIndex]}')`;
  }
}
