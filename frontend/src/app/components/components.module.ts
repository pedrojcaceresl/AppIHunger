import { ComponentsComponent } from './components.component';
import { CartPopoverComponent } from './cart-popover/cart-popover.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ComponentsComponent, CartPopoverComponent],
})
export class ComponentsModule { }
