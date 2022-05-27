import { ProductoService } from './../../services/producto.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.page.html',
  styleUrls: ['./productos.page.scss'],
})
export class ProductosPage implements OnInit {
  productos;
  constructor(
    public productoService: ProductoService,

  ) { }

 
  ngOnInit() {
    this.listarProductos();
    this.buscarProducto(event);
  }

  ionViewWillEnter() {
    this.listarProductos();
  }

  public listarProductos(){
    this.productoService.get().subscribe((data) => {
      this.productos = data.result;
      console.log('PRODUCTOOO',this.productos);
    });
  }

  buscarProducto(event){
    console.log(event);
  }

  eliminarProducto(producto, index, slidingItem){
    console.log(producto);
    console.log(index);
    console.log(slidingItem);
  }

  //write a function to add item to cart and update the cart

}
