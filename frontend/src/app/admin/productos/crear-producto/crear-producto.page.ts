import { AlertController, ModalController } from "@ionic/angular";
import { CategoriaService } from "./../../../services/categoria.service";
import { Router } from "@angular/router";
import { FormBuilder, FormGroup } from "@angular/forms";
import { ProductoService } from "./../../../services/producto.service";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-crear-producto",
  templateUrl: "./crear-producto.page.html",
  styleUrls: ["./crear-producto.page.scss"],
})
export class CrearProductoPage implements OnInit {
  productoForm: FormGroup;
  id;
  producto;
  productoResult;
  precio;
  descripcion;
  imagen;
  cat_id;
  categoria;
  cat_nombre;

  constructor(
    private productoService: ProductoService,
    private formBuilder: FormBuilder,
    public router: Router,
    public modalController: ModalController,
    private categoriaService: CategoriaService,
    public alertController: AlertController
  ) {
    this.productoForm = this.formBuilder.group({
      pro_nombre: [""],
      pro_descripcion: [""],
      image: [""],
      pro_precio: [""],
      cat_id: [""],
    });
  }

  ngOnInit() {
    this.listCategoria();
    // this.productoForm.patchValue({ pro_id: this.id });
    // this.productoForm.patchValue({ cat_id: this.cat_id });
  }

  async presentAlert(msg) {
    let alert = this.alertController.create({
      message: msg,
      buttons: [
        {
          text: "Ok",
          role: "ok",
        },
      ],
    });
    (await alert).present();
  }

  public async getProducto(id) {
    await this.productoService.getProductoById(id).subscribe((res) => {
      this.productoResult = res.result;
    });
  }

  public async crearProducto() {
    console.log("PRODUCTO A CREAR ", this.productoForm.value);
    await this.productoService
      .crearProducto(this.productoForm.value)
      .subscribe((data) => {
        if (data.success == true) {
          this.presentAlert("Producto Creado!!!");
          this.router.navigate(["/admin/productos"]);
        }
      });
  }

  public listCategoria() {
    this.categoriaService.get().subscribe((data) => {
      this.categoria = data.result;
      console.log("categorias ", this.categoria);
    });
  }

  public getCategoriaById(id) {
    this.categoriaService.getCategoriaById(id).subscribe((data) => {
      this.cat_nombre = data.result.cat_nombre;
    });
  }
}
