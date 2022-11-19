import { ModalController } from "@ionic/angular";
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

  constructor(
    private productoService: ProductoService,
    private formBuilder: FormBuilder,
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public modalController: ModalController
  ) {
    this.editarProductoForm = this.formBuilder.group({
      prod_id: [0],
      prod_precio: [""],
      prod_descripcion: [""],
    });
    this.id = this.activatedRoute.snapshot.paramMap.get("id");
  }

  ngOnInit() {
    this.getProducto(this.id);
    this.editarProductoForm.patchValue({ prod_id: parseInt(this.id) });
  }

  public async getProducto(id) {
    await this.productoService.getProductoById(id).subscribe((res) => {
      this.productoResult = res.result;
      console.log("EL PRODUCTO BY ID: ", res.result);
      this.precio = this.productoResult.pro_precio;
      this.descripcion = this.productoResult.pro_descripcion;
    });
  }

  public async editarProducto() {
    console.log("Valores formulario: ", this.editarProductoForm.value);
    this.productoService
      .actualizarProducto(this.editarProductoForm.value, this.id)
      .subscribe((res) => {
        if (res.success == true) {
          this.editarProductoForm.reset();
          this.router.navigate(["/admin/productos"]);
        }
      });
  }
}
