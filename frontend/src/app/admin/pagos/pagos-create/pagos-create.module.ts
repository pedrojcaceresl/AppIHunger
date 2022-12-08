import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { PagosCreatePageRoutingModule } from "./pagos-create-routing.module";

import { PagosCreatePage } from "./pagos-create.page";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PagosCreatePageRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [PagosCreatePage],
})
export class PagosCreatePageModule {}
