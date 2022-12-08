import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { PagosEditPageRoutingModule } from "./pagos-edit-routing.module";

import { PagosEditPage } from "./pagos-edit.page";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PagosEditPageRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [PagosEditPage],
})
export class PagosEditPageModule {}
