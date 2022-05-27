import { ModalController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CategoriaService } from './../../../services/categoria.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-editar-categoria',
  templateUrl: './editar-categoria.page.html',
  styleUrls: ['./editar-categoria.page.scss'],
})
export class EditarCategoriaPage implements OnInit {
  editarCategoriaForm: FormGroup;
  id;
  categoria;
  categoriaResult;
  nombre;
  descripcion;

  constructor(
    private categoriaService: CategoriaService,
    private formBuilder: FormBuilder,
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public modalController: ModalController,
  ) {
    
    this.editarCategoriaForm = this.formBuilder.group({
      cat_id: [''],
      cat_nombre: [''],
      cat_descripcion: [''],

    });
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
   }

  ngOnInit() {
    this.getCategoria(this.id);
    this.editarCategoriaForm.patchValue({ cat_id: this.id });
  }

  public async getCategoria(id){
    await this.categoriaService.getCategoriaById(id).subscribe((res) => {
      this.categoriaResult = res.result;
      this.nombre = this.categoriaResult.cat_nombre;
      this.descripcion = this.categoriaResult.cat_descripcion;

    });
  }

  public async updateCategoria(){
    this.categoriaService.actualizarCategoria(this.editarCategoriaForm.value).subscribe((res) => {
      if(res.success == true){
        this.editarCategoriaForm.reset();
        this.router.navigate(['/admin/categorias']);
      }
    });
  }

}
