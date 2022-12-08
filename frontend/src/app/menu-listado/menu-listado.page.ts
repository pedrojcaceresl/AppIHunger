import { Producto } from "./../interfaces/Producto";
import { ProductoService } from "./../services/producto.service";
import { LocalStorageService } from "./../services/localStorage.service";
import { ActivatedRoute, Router } from "@angular/router";
import { ActionSheetController } from "@ionic/angular";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-menu-listado",
  templateUrl: "./menu-listado.page.html",
  styleUrls: ["./menu-listado.page.scss"],
})
export class MenuListadoPage implements OnInit {
  constructor(
    private actionSheetCtrl: ActionSheetController,
    private router: Router,
    private productoService: ProductoService,
    private activatedRoute: ActivatedRoute
  ) {}
  switch = false;
  totalValues;
  productos = new Array<Producto>();
  currentId;
  categoriaId;

  ngOnInit() {
    this.getProductos();
    this.activatedRoute.params.subscribe((data) => {
      this.categoriaId = data.categoriaId;
      if (this.categoriaId) this.filterCategoriasById();
    });
  }

  getProductos() {
    if (!this.categoriaId) {
      this.productoService.get().subscribe((data) => {
        this.productos = data.result;
        console.log(this.productos);
      });
    }
  }

  filterCategoriasById() {
    this.productoService.get().subscribe((data) => {
      this.productos = data.result.filter(
        (producto) => producto.cat_id == this.categoriaId
      );
    });
  }

  onClick() {
    return (this.switch = true);
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
}
