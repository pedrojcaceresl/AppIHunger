import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UsuarioCreadoPageRoutingModule } from './usuario-creado-routing.module';

import { UsuarioCreadoPage } from './usuario-creado.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UsuarioCreadoPageRoutingModule
  ],
  declarations: [UsuarioCreadoPage]
})
export class UsuarioCreadoPageModule {}
