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
  productosResult = [];
  cart = [];
  products = [];
  hasChange = false;
  topBebidas = [];

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
      // console.log(this.categoriasResult);
    });
  }

  getProductos() {
    this.productoService.get().subscribe((data) => {
      this.productosResult = data.result.slice(0, 5);
      this.productosResult = this.productosResult.filter(
        (data) => data.cat_id != 10
      );
    });
    this.getTopBebidas();
  }

  getTopBebidas() {
    this.productoService.get().subscribe((data) => {
      this.topBebidas = data.result;
      this.topBebidas = this.topBebidas.filter((data) => data.cat_id === 10);
      console.log(this.topBebidas);
    });
  }

  removeFromCart(producto) {
    this.cart.splice(this.cart.indexOf(producto), 1);
    this.localStorage.setItem("cart", this.cart);
    console.log(this.cart);
  }

  goToCategoria(event) {
    this.navCtrl.navigateForward(`/menu-listado/${event.cat_id}`);
  }

  onChange($event) {
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

  goToCart() {
    this.navCtrl.navigateForward("/carrito");
  }
}
