import { Router } from '@angular/router';
import { CategoriaService } from './../../../services/categoria.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-crear-categoria',
  templateUrl: './crear-categoria.page.html',
  styleUrls: ['./crear-categoria.page.scss'],
})
export class CrearCategoriaPage implements OnInit {

  
  categoria;
  crearCategoriaForm: FormGroup;

  constructor(
    private categoriaService: CategoriaService,
    private formBuilder: FormBuilder,
    private router: Router
    ) {

      this.crearCategoriaForm = this.formBuilder.group({
        cat_nombre: [''],
        cat_descripcion: [''],

      })
     }

  ngOnInit() {
  }

  crearCategoria(){
    console.log(this.crearCategoriaForm.value);
   this.categoriaService.crearCategoria(this.crearCategoriaForm.value).subscribe((res) => {
      
      if(res.success == true){
        this.router.navigate(['/admin/categorias']);
      }
    });


  }


}
