import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../services/usuario.service';
import { Usuario, Rol } from '../models/usuario.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-usuario',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './usuario.component.html',
    styleUrls: ['./usuario.component.scss']
})
export class UsuarioComponent implements OnInit {
    usuarios: Usuario[] = [];
    totalElements = 0;
    page = 0;
    size = 10;
    busqueda = '';
    estadoFiltro = '';
  
    roles = Object.values(Rol);

    constructor(private usuarioService: UsuarioService) {}

    ngOnInit(): void {
        this.cargarUsuarios();
    }

    cargarUsuarios(): void {
        this.usuarioService.listar(this.busqueda, this.estadoFiltro, this.page, this.size)
        .subscribe(resp => {
            this.usuarios = resp.content;
            this.totalElements = resp.totalElements;
        });
    }

    onSearch(): void {
        this.page = 0;
        this.cargarUsuarios();
    }

    cambiarPagina(event: any): void {
        this.page = event.pageIndex;
        this.size = event.pageSize;
        this.cargarUsuarios();
    }

    eliminarUsuario(id: number | undefined): void {
        if (id !== undefined && confirm('¿Está seguro de desactivar este usuario?')) {
        this.usuarioService.desactivar(id).subscribe(() => {
            this.cargarUsuarios();
        });
        }
    }
}
