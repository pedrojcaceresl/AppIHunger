import { ContinuarFinalizarModalPage } from "./../continuar-finalizar-modal/continuar-finalizar-modal.page";
import {
  IonRouterOutlet,
  ModalController,
  ActionSheetController,
} from "@ionic/angular";
import { asNativeElements, Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-detalle-producto",
  templateUrl: "./detalle-producto.page.html",
  styleUrls: ["./detalle-producto.page.scss"],
})
export class DetalleProductoPage implements OnInit {
  sumaUno = 1;
  RestaUno = 1;
  precio = 20000;
  cart = [];

  constructor(
    private modalController: ModalController,
    public routerOutlet: IonRouterOutlet,
    private actionSheetCtrl: ActionSheetController,
    private router: Router
  ) {}

  ngOnInit() {}

  addPlus() {
    console.log("addPlus");
    this.sumaUno = this.sumaUno + 1;
    this.calcularTotal();
    console.log(this.sumaUno, this.precio);
    this.addToCart();
    return this.sumaUno;
  }

  reduceOne() {
    console.log("reduceOne");
    this.sumaUno = this.sumaUno - 1;
    this.restarTotal();
    this.removeFromCart(1);
    return;
  }

  calcularTotal() {
    console.log("calcularTotal");
    return (this.precio = this.sumaUno * 20000);
  }

  restarTotal() {
    console.log("restarTotal");
    let temp = 20000;
    this.precio = this.precio - temp;
    return this.precio;
  }

  async aopenModal() {
    console.log("modall open");
    const modal = await this.modalController.create({
      component: ContinuarFinalizarModalPage,
      swipeToClose: true,
      presentingElement: this.routerOutlet.nativeEl,
    });
    return await modal.present();
  }

  async openModal() {
    const actionSheet = await this.actionSheetCtrl.create({
      header: "Finalizar o continuar",
      buttons: [
        {
          text: "Finalizar Pedido",
          role: "destructive",
        },
        {
          text: "Continuar comprando",
          role: "cancel",
        },
      ],
    });

    await actionSheet.present();

    const { role } = await actionSheet.onDidDismiss();

    if (role === "destructive") {
      this.router.navigateByUrl("/finalizar-pedido");
      return true;
    }

    return false;
  }

  //write a function to add the product to the cart
  async addToCart() {
    //create a new object to add to the cart
    let cartItem = {
      id: 1,
      name: "Producto 1",
      price: 20000,
      quantity: this.sumaUno,
    };
    //add the object to the cart
    this.cart.push(cartItem);
    //save each cart item to local storage
    localStorage.setItem("cart", JSON.stringify(this.cart));
    //open the modal
    //await this.aopenModal();
    //go to the cart page
   // this.router.navigateByUrl("/finalizar-pedido");
  }

  //write a function to get the cart from local storage
  getCart() {
    let store = JSON.parse(localStorage.getItem("cart"));
    if (store) {
      this.cart = store;
    }
    return this.cart;

  }

  //write a function to remove an item from the cart
  removeFromCart(item) {
    //remove the item from the cart
    this.cart.splice(this.cart.indexOf(item), 1);
    //save the cart
    localStorage.setItem("cart", JSON.stringify(this.cart));
    //refresh the cart
    this.getCart();
  }

  //write a function to add item to cart and update the cart
  updateCart(item) {
    //get the index of the item in the cart
    let index = this.cart.indexOf(item);
    //update the quantity
    this.cart[index].quantity = this.sumaUno;
    //save the cart
    localStorage.setItem("cart", JSON.stringify(this.cart));
    //refresh the cart
    this.getCart();
  }
    
}
