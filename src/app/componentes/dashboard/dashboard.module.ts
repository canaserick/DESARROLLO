import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { InicioComponent } from './inicio/inicio.component';
import { NavbarComponent } from './navbar/navbar.component';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CrearVaComponent } from './crear-va/crear-va.component';
import { ReactiveFormsModule } from '@angular/forms';
import { EditarVaComponent } from './editar-va/editar-va.component';

@NgModule({
  declarations: [
    DashboardComponent,
    InicioComponent,
    NavbarComponent,
    CrearVaComponent,
    EditarVaComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule,
    MatCardModule,
    MatToolbarModule,
    ReactiveFormsModule
  ],
  exports:[
    MatCardModule,
    MatToolbarModule,
    ReactiveFormsModule
  ]
})
export class DashboardModule { }
