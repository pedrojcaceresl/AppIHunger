import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-finalizar-pedido',
  templateUrl: './finalizar-pedido.page.html',
  styleUrls: ['./finalizar-pedido.page.scss'],
})
export class FinalizarPedidoPage implements OnInit {

  constructor() { }
  cart;
  cartResult;
  ngOnInit() {
    this.getCartItems();
    console.log('cart', this.cart);
  }


  //write a function to get cart items from local storage
  getCartItems() {
    let store = JSON.parse(localStorage.getItem("cart"));
    if (store) {
      this.cart = store;
    }
    console.log('object', this.cart);
    this.cartResult = this.cart;
    return this.cart;
  }

}
