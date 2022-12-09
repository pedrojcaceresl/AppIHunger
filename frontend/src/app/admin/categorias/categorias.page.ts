import { AlertController } from "@ionic/angular";
import { CarritoService } from "./../../services/carrito.service";
import { CategoriaService } from "./../../services/categoria.service";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-categorias",
  templateUrl: "./categorias.page.html",
  styleUrls: ["./categorias.page.scss"],
})
export class CategoriasPage implements OnInit {
  categorias;
  handlerMessage = "";
  roleMessage;

  constructor(
    private categoriaService: CategoriaService,
    private CarritoService: CarritoService,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    this.listarCategorias();
    this.CarritoService.datos.emit(false);
  }

  onBack() {
    this.CarritoService.datos.emit(true);
  }

  ionViewWillEnter() {
    this.listarCategorias();
  }

  listarCategorias() {
    this.categoriaService.get().subscribe((data) => {
      this.categorias = data.result;
    });
  }

  buscarCategorias(value) {
    console.log("buscando categoriaaa", value);
    try {
      this.categoriaService.filtrarCategoria(value).subscribe((data) => {
        this.categorias = data.result;
      });
    } catch (error) {
      alert(error.message);
    }
  }
  onChange(event) {
    try {
      if (event.detail.value.trim().length > 0) {
        this.buscarCategorias(event.detail.value);
      } else {
        this.listarCategorias();
      }
    } catch (error) {}
  }
  onClick(categoria) {
    console.log(categoria);
    this.eliminarCategoria(categoria);
  }

  async presentDialog(text) {
    const alert = await this.alertController.create({
      header: `${text}`,
      buttons: [
        {
          text: "Cancel",
          role: "cancel",
          handler: () => {
            this.handlerMessage = "Alert canceled";
          },
        },
        {
          text: "OK",
          role: "ok",
          handler: () => {
            this.handlerMessage = "Alert confirmed";
          },
        },
      ],
    });

    await alert.present();
    const { role } = await alert.onDidDismiss();

    this.roleMessage = role;
  }

  async eliminarCategoria(categoria) {
    await this.presentDialog("Seguro que quieres eliminar?");
    if (this.roleMessage === "ok") {
      this.categoriaService
        .eliminarCategoria(categoria.cat_id)
        .subscribe(() => {
          this.listarCategorias();
        });
    } else if (this.roleMessage === "cancel") {
      this.listarCategorias();
    }
  }
}
