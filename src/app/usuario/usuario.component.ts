import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, Validators, FormsModule, ReactiveFormsModule, FormControl } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';

import { UsuarioService } from '../services/usuario.service';
import { Usuario, Rol } from '../models/usuario.model';

@Component({
    selector: 'app-usuario',
    standalone: true,
    imports: [CommonModule, FormsModule, ReactiveFormsModule],
    templateUrl: './usuario.component.html',
    styleUrls: ['./usuario.component.scss']
})
export class UsuarioComponent implements OnInit {
    usuarios: Usuario[] = [];
    cargando = false;
    error = '';
    mensaje = '';
    editandoId: number | null = null;
    filtroBusqueda = new FormControl('', { nonNullable: true });

    readonly availableRoles: Rol[] = [
        { id: 1, nombre: 'ADMIN' },
        { id: 2, nombre: 'USER' }
    ];

    readonly form = this.fb.nonNullable.group({
        username: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        passwordHash: [''],
        estado: ['ACTIVO'],
        roles: [[] as Rol[]]
    });

    constructor(
        private readonly fb: FormBuilder,
        private readonly usuarioService: UsuarioService
    ) {}

    ngOnInit(): void {
        this.cargarUsuarios();
    }

    cargarUsuarios(): void {
        this.cargando = true;
        this.error = '';
        this.mensaje = '';

        this.usuarioService.listar().subscribe({
            next: (data) => {
                this.usuarios = (data as any).content || data;
                this.cargando = false;
            },
            error: (err: HttpErrorResponse) => {
                this.error = this.obtenerMensajeError(err, 'No se pudo listar usuarios');
                this.cargando = false;
            }
        });
    }

    buscar(): void {
        const q = this.filtroBusqueda.value.trim();
        if (!q) {
            this.cargarUsuarios();
            return;
        }

        this.cargando = true;
        this.error = '';
        this.mensaje = '';

        this.usuarioService.listar(undefined, undefined, undefined, undefined, q).subscribe({
            next: (data) => {
                this.usuarios = (data as any).content || data;
                this.cargando = false;
            },
            error: (err: HttpErrorResponse) => {
                this.error = this.obtenerMensajeError(err, 'No se pudo buscar usuarios');
                this.usuarios = [];
                this.cargando = false;
            }
        });
    }

    limpiarBusqueda(): void {
        this.filtroBusqueda.setValue('');
        this.cargarUsuarios();
    }

    guardar(): void {
        if (this.form.invalid) {
            this.form.markAllAsTouched();
            return;
        }

        this.error = '';
        this.mensaje = '';
        const payload: Usuario = this.form.getRawValue();

        if (this.editandoId !== null) {
            this.usuarioService.actualizar(this.editandoId, payload).subscribe({
                next: () => {
                    this.mensaje = 'Usuario actualizado correctamente';
                    this.cancelarEdicion();
                    this.cargarUsuarios();
                },
                error: (err: HttpErrorResponse) => {
                    this.error = this.obtenerMensajeError(err, 'No se pudo actualizar el usuario');
                }
            });
            return;
        }

        this.usuarioService.crear(payload).subscribe({
            next: () => {
                this.mensaje = 'Usuario creado correctamente';
                this.form.reset({
                    username: '',
                    email: '',
                    passwordHash: '',
                    estado: 'ACTIVO',
                    roles: []
                });
                this.cargarUsuarios();
            },
            error: (err: HttpErrorResponse) => {
                this.error = this.obtenerMensajeError(err, 'No se pudo crear el usuario');
            }
        });
    }

    iniciarEdicion(usuario: Usuario): void {
        this.editandoId = usuario.id ?? null;
        this.form.patchValue({
            username: usuario.username,
            email: usuario.email,
            passwordHash: '',
            estado: usuario.estado ?? 'ACTIVO',
            roles: usuario.roles ?? []
        });
    }

    hasRole(role: Rol): boolean {
        const roles = this.form.controls.roles.value ?? [];
        return roles.some((selected: Rol) => selected.nombre === role.nombre);
    }

    toggleRole(role: Rol): void {
        const roles = [...(this.form.controls.roles.value ?? [])];
        const index = roles.findIndex((selected: Rol) => selected.nombre === role.nombre);
        if (index === -1) {
            roles.push(role);
        } else {
            roles.splice(index, 1);
        }
        this.form.controls.roles.setValue(roles);
    }

    cancelarEdicion(): void {
        this.editandoId = null;
        this.form.reset({
            username: '',
            email: '',
            passwordHash: '',
            estado: 'ACTIVO',
            roles: []
        });
    }

    eliminar(id: number | undefined): void {
        if (id === undefined) {
            return;
        }

        const confirmar = globalThis.confirm('¿Seguro que deseas eliminar este usuario?');
        if (!confirmar) {
            return;
        }

        this.error = '';
        this.mensaje = '';

        this.usuarioService.eliminar(id).subscribe({
            next: () => {
                this.mensaje = 'Usuario eliminado correctamente';
                this.cargarUsuarios();
            },
            error: (err: HttpErrorResponse) => {
                this.error = this.obtenerMensajeError(err, 'No se pudo eliminar el usuario');
            }
        });
    }

    getRolesText(usuario: Usuario): string {
        return usuario.roles?.map(role => role.nombre).join(', ') ?? '';
    }

    private obtenerMensajeError(err: HttpErrorResponse, fallback: string): string {
        return err.error?.message || fallback;
    }
}