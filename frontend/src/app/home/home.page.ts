import { CartPopoverComponent } from "../components/cart-popover/cart-popover.component";
import { LocalStorageService } from "./../services/localStorage.service";
import { ProductoService } from "./../services/producto.service";
import { CategoriaService } from "./../services/categoria.service";
import {
  MenuController,
  NavController,
  PopoverController,
} from "@ionic/angular";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-home",
  templateUrl: "./home.page.html",
  styleUrls: ["./home.page.scss"],
})
export class HomePage implements OnInit {
  categoriasResult;
  productosResult;
  cart = [];
  products = [];
  hasChange = false;

  constructor(
    menu: MenuController,
    public categoriaService: CategoriaService,
    public productoService: ProductoService,
    public localStorage: LocalStorageService,
    public popoverController: PopoverController,
    public navCtrl: NavController
  ) {}

  ngOnInit() {
    this.getCategorias();
    this.getProductos();
  }

  options = {
    centeredSlides: true,
    slidesPerView: 1,
    spaceBetween: -60,
  };

  categories = {
    slidesPerView: 2.5,
  };

  getCategorias() {
    this.categoriaService.get().subscribe((data) => {
      this.categoriasResult = data.result;
      console.log(this.categoriasResult);
    });
  }

  getProductos() {
    this.productoService.get().subscribe((data) => {
      this.productosResult = data.result.slice(0, 5);
      console.log(this.productosResult);
    });
  }

  //write a function to add item to cart local storage and update the cart
  public addToCart(producto) {
    if (localStorage.getItem("cart")) {
      this.products = JSON.parse(localStorage.getItem("cart"));
    }
    this.cart.push({
      productId: producto.pro_id + 1,
      descripcion: producto.pro_descripcion,
      precio: producto.pro_precio,
    });
    this.localStorage.setItem("cart", this.cart);
    console.log(this.cart);
  }

  public removeFromCart(producto) {
    this.cart.splice(this.cart.indexOf(producto), 1);
    this.localStorage.setItem("cart", this.cart);
    console.log(this.cart);
  }

  public onChange($event) {
    console.log($event.detail.value);
    if (
      $event.detail &&
      $event.detail.value &&
      $event.detail.value.length > 0
    ) {
      this.productoService
        .filtrarProducto($event.detail.value)
        .subscribe((data) => {
          this.productosResult = data.result;
          this.hasChange = true;
        });
    } else {
      this.hasChange = false;
      this.getProductos();
    }
  }

  // async openCartModal(ev: any) {
  //   const popover = await this.popoverController.create({
  //     component: CartPopoverComponent,
  //     event: ev,
  //     translucent: false,
  //   });

  //   await popover.present();
  // }

  goToCart() {
    this.navCtrl.navigateForward("/carrito");
  }
}
