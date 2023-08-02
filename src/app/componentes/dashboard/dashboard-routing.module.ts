import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { DashboardComponent } from './dashboard.component';
import { InicioComponent } from './inicio/inicio.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { VariedadComponent } from './variedad/variedad.component';
import { CrearVaComponent } from './crear-va/crear-va.component';

const routes: Routes = [
  {path: '', component: DashboardComponent, children:[
    { path: 'inicio', component: InicioComponent },
    { path: 'usuarios', component: UsuariosComponent },
    { path: 'variedad', component: VariedadComponent },
    { path: 'logout', component: LoginComponent },
    { path: 'crear-variedad', component: CrearVaComponent},
    { path: 'crear-variedad/:id', component: CrearVaComponent},
    { path:'', redirectTo:'inicio', pathMatch:'full' },
    { path:'**', redirectTo:'inicio', pathMatch:'full' }
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
