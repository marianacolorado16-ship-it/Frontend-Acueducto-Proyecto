import { Component, OnInit } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { NavigationService } from './navigation.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'prueba-front';
  activeSection: string = 'home';

  constructor(private navService: NavigationService) {}

  ngOnInit() {
    // Nos suscribimos al servicio para saber qué sección "alumbrar" en el header
    this.navService.activeSectionId$.subscribe(id => {
      if (id) this.activeSection = id;
    });
  }
}
