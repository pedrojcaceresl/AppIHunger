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
   // this.buscarProducto(event);
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

 /*  buscarProducto(event){
    let val = event.target.value;
    if (val && val.trim() != '') {
      this.productoService.filtrarProducto(val).subscribe((res) => {
        this.productos = res.result;
        this.productos = this.productos.filter((item) => {
          return (item.cat_nombre.toLowerCase().indexOf(val.toLowerCase()) > -1);
        })
      });
    } else {
      this.listarProductos();
    }
  } */

  eliminarProducto(producto, index, slidingItem){
    console.log(producto);
    console.log(index);
    console.log(slidingItem);
  }

  //write a function to add item to cart and update the cart

}
