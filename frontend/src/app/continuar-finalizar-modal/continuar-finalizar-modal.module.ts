import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ContinuarFinalizarModalPageRoutingModule } from './continuar-finalizar-modal-routing.module';

import { ContinuarFinalizarModalPage } from './continuar-finalizar-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ContinuarFinalizarModalPageRoutingModule
  ],
  declarations: [ContinuarFinalizarModalPage]
})
export class ContinuarFinalizarModalPageModule {}
