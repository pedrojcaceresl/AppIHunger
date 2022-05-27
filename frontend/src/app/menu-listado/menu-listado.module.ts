import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MenuListadoPageRoutingModule } from './menu-listado-routing.module';

import { MenuListadoPage } from './menu-listado.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MenuListadoPageRoutingModule,
  ],
  declarations: [MenuListadoPage]
})
export class MenuListadoPageModule {}
