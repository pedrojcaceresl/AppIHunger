
import { Injectable,EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {

  datos = new EventEmitter();


  constructor() { }


 public updateCarritoStatus(value){
  this.datos.emit(value);
 }

}
