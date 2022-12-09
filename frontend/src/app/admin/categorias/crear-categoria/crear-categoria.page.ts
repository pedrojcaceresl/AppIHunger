import { Router } from "@angular/router";
import { CategoriaService } from "./../../../services/categoria.service";
import { FormBuilder, FormGroup } from "@angular/forms";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-crear-categoria",
  templateUrl: "./crear-categoria.page.html",
  styleUrls: ["./crear-categoria.page.scss"],
})
export class CrearCategoriaPage implements OnInit {
  categoria;
  registroCategoriaForm: FormGroup;

  constructor(
    private categoriaService: CategoriaService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.registroCategoriaForm = this.formBuilder.group({
      cat_nombre: [""],
      cat_descripcion: [""],
      image: [""],
    });
  }

  ngOnInit() {}

  crearCategoria() {
    console.log(this.registroCategoriaForm.value);
    this.categoriaService
      .crearCategoria(this.registroCategoriaForm.value)
      .subscribe((res) => {
        if (res.success == true) {
          this.router.navigate(["/admin/categorias"]);
        }
      });
  }
}
