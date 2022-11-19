import { PedidoService } from "./../services/pedido.service";
import { ProductoService } from "./../services/producto.service";
import { Detalle } from "./../interfaces/Detalle";
import { Producto } from "./../interfaces/Producto";
import { ContinuarFinalizarModalPage } from "./../continuar-finalizar-modal/continuar-finalizar-modal.page";
import {
  IonRouterOutlet,
  ModalController,
  ActionSheetController,
  NavController,
} from "@ionic/angular";
import { asNativeElements, Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-detalle-producto",
  templateUrl: "./detalle-producto.page.html",
  styleUrls: ["./detalle-producto.page.scss"],
})
export class DetalleProductoPage implements OnInit {
  sumaUno = 1;
  RestaUno = 1;
  precio = 0;
  cart = [];
  producto = new Producto();
  currentId;
  obs = null;

  constructor(
    public routerOutlet: IonRouterOutlet,
    private route: ActivatedRoute,
    private navigation: NavController,
    private productService: ProductoService,
    private pedidoService: PedidoService
  ) {}

  ngOnInit() {
    this.currentId = this.route.snapshot.paramMap.get("id");
    this.getProductById();
  }

  getProductById() {
    this.productService.getProductoById(this.currentId).subscribe((res) => {
      this.producto = res.result;
      this.setPrice(this.producto.pro_precio);
      this.pedidoService.getDetalleByProductoId(this.currentId);
    });
  }

  setObservation($event) {
    this.obs = $event.target.value;
  }

  setPrice(value) {
    this.precio = value;
  }

  calculateIva(iva, value) {
    if (iva && iva > 0) return (iva * value) / 100;
    return 0;
  }

  addNewDetail() {
    let detail = new Detalle();
    let IVA = this.calculateIva(this.producto.pro_iva, this.precio);
    // Add the details
    detail.cantidad = this.sumaUno;
    detail.precioUnit = Number(this.producto.pro_precio);
    detail.ivaPorcent = this.producto.pro_iva;
    detail.productoId = this.producto.pro_id;
    detail.totalGeneral = Number(this.precio);
    detail.totalParcial = this.precio - IVA;
    detail.ivaPorcent = this.producto.pro_iva
      ? Number(this.producto.pro_iva)
      : 0;
    detail.valorIva = IVA;
    detail.estado = 1;
    detail.obs = this.obs ? this.obs.trim() : "";
    detail.descripcion = this.producto.pro_descripcion;
    detail.producto = this.producto.pro_nombre;
    detail.image = this.producto.image;
    this.navigation.pop();
    console.log(detail);
  }

  addPlus() {
    this.sumaUno = this.sumaUno + 1;
    this.calcularTotal();
    return this.sumaUno;
  }

  reduceOne() {
    if (this.sumaUno > 1) {
      this.sumaUno = this.sumaUno - 1;
      this.restarTotal();
    }
    return;
  }

  calcularTotal() {
    console.log("calcularTotal");
    return (this.precio = this.sumaUno * this.producto.pro_precio);
  }

  restarTotal() {
    console.log("restarTotal");
    this.precio = this.precio - this.producto.pro_precio;
    return this.precio;
  }

  // async aopenModal() {
  //   console.log("modall open");
  //   const modal = await this.modalController.create({
  //     component: ContinuarFinalizarModalPage,
  //     swipeToClose: true,
  //     presentingElement: this.routerOutlet.nativeEl,
  //   });
  //   return await modal.present();
  // }

  // async openModal() {
  //   const actionSheet = await this.actionSheetCtrl.create({
  //     header: "Finalizar o continuar",
  //     buttons: [
  //       {
  //         text: "Finalizar Pedido",
  //         role: "destructive",
  //       },
  //       {
  //         text: "Continuar comprando",
  //         role: "cancel",
  //       },
  //     ],
  //   });

  //   await actionSheet.present();

  //   const { role } = await actionSheet.onDidDismiss();

  //   if (role === "destructive") {
  //     this.router.navigateByUrl("/finalizar-pedido");
  //     return true;
  //   }

  //   return false;
  // }

  // //write a function to add the product to the cart
  // async addToCart() {
  //   //create a new object to add to the cart
  //   let cartItem = {
  //     id: 1,
  //     name: "Producto 1",
  //     price: 20000,
  //     quantity: this.sumaUno,
  //   };
  //   //add the object to the cart
  //   this.cart.push(cartItem);
  //   //save each cart item to local storage
  //   localStorage.setItem("cart", JSON.stringify(this.cart));
  //   //open the modal
  //   //await this.aopenModal();
  //   //go to the cart page
  //   // this.router.navigateByUrl("/finalizar-pedido");
  // }

  // //write a function to get the cart from local storage
  // getCart() {
  //   let store = JSON.parse(localStorage.getItem("cart"));
  //   if (store) {
  //     this.cart = store;
  //   }
  //   return this.cart;
  // }

  // //write a function to remove an item from the cart
  // removeFromCart(item) {
  //   //remove the item from the cart
  //   this.cart.splice(this.cart.indexOf(item), 1);
  //   //save the cart
  //   localStorage.setItem("cart", JSON.stringify(this.cart));
  //   //refresh the cart
  //   this.getCart();
  // }

  // //write a function to add item to cart and update the cart
  // updateCart(item) {
  //   //get the index of the item in the cart
  //   let index = this.cart.indexOf(item);
  //   //update the quantity
  //   this.cart[index].quantity = this.sumaUno;
  //   //save the cart
  //   localStorage.setItem("cart", JSON.stringify(this.cart));
  //   //refresh the cart
  //   this.getCart();
  // }
}
