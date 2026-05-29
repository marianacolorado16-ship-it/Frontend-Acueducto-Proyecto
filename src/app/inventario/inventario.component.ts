import { Component, OnInit } from '@angular/core';
import { InventarioService } from '../services/inventario.service';
import { Inventario } from '../models/inventario.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-inventario',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './inventario.component.html',
  styleUrls: ['./inventario.component.scss']
})
export class InventarioComponent implements OnInit {
  items: Inventario[] = [];
  selectedItem?: Inventario;

  constructor(private inventarioService: InventarioService) {}

  ngOnInit(): void {
    this.inventarioService.getAll().subscribe(data => this.items = data);
  }

  seleccionarItem(item: Inventario) {
    this.selectedItem = item;
  }
}