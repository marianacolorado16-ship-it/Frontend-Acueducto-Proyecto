import { Routes } from '@angular/router';
import {ClienteComponent} from './cliente/cliente.component';
import { UsuarioComponent } from './usuario/usuario.component';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
    {path: '', redirectTo: 'home', pathMatch: 'full'},
    {path: 'home', component: HomeComponent},
    {path: 'cliente', component: ClienteComponent,},
    {path: 'usuario', component: UsuarioComponent},
    {path: '**', redirectTo: 'home'}
];
