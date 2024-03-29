import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { CrearProductoPageRoutingModule } from "./crear-producto-routing.module";

import { CrearProductoPage } from "./crear-producto.page";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CrearProductoPageRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [CrearProductoPage],
})
export class CrearProductoPageModule {}
