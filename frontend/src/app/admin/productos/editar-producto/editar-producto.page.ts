import { CategoriaService } from "./../../../services/categoria.service";
import { AlertController, ModalController } from "@ionic/angular";
import { Router, ActivatedRoute } from "@angular/router";
import { FormBuilder, FormGroup } from "@angular/forms";
import { ProductoService } from "./../../../services/producto.service";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-editar-producto",
  templateUrl: "./editar-producto.page.html",
  styleUrls: ["./editar-producto.page.scss"],
})
export class EditarProductoPage implements OnInit {
  editarProductoForm: FormGroup;
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
    public activatedRoute: ActivatedRoute,
    public modalController: ModalController,
    private categoriaService: CategoriaService,
    public alertController: AlertController
  ) {
    this.editarProductoForm = this.formBuilder.group({
      pro_id: [""],
      pro_nombre: [""],
      pro_descripcion: [""],
      image: [""],
      pro_precio: [""],
      cat_id: [""],
    });
    this.id = this.activatedRoute.snapshot.paramMap.get("id");
  }

  ngOnInit() {
    this.getProducto(this.id);
    this.listCategoria();

    this.editarProductoForm.patchValue({ pro_id: this.id });
    // this.editarProductoForm.patchValue({ cat_id: this.cat_id });
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
      this.precio = this.productoResult.pro_precio;
      this.descripcion = this.productoResult.pro_descripcion;
      this.imagen = this.productoResult.image;
      this.cat_id = this.productoResult.cat_id;
    });
  }

  public async editarProducto() {
    console.log("Valores formulario: ", this.editarProductoForm.value);
    this.productoService
      .actualizarProducto(this.editarProductoForm.value)
      .subscribe((res) => {
        if (res.success == true) {
          this.presentAlert("Producto actualizado!");
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
