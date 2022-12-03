import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { MiCuentaPageRoutingModule } from "./mi-cuenta-routing.module";

import { MiCuentaPage } from "./mi-cuenta.page";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MiCuentaPageRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [MiCuentaPage],
})
export class MiCuentaPageModule {}
