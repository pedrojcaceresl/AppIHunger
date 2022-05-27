import { CategoriaService } from './../../services/categoria.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.page.html',
  styleUrls: ['./categorias.page.scss'],
})
export class CategoriasPage implements OnInit {
  categorias;

  constructor(
    private categoriaService: CategoriaService
  ) { }

  ngOnInit() {
    this.listarCategorias();
  }

  ionViewWillEnter() {
    this.listarCategorias();
  }

  listarCategorias() {
    this.categoriaService.get().subscribe((data) => {
      this.categorias = data.result;
    });
  }

  buscarCategorias(event) { 
    let val = event.target.value;
    if (val && val.trim() != '') {
      this.categoriaService.filtrarCategoria(val).subscribe((res) => {
        this.categorias = res.result;
        this.categorias = this.categorias.filter((item) => {
          return (item.cat_nombre.toLowerCase().indexOf(val.toLowerCase()) > -1);
        })
      });
    } else {
      this.listarCategorias();
    }
  }

/*   eliminarCategoria(categoria, i, slidingItem) {
    console.log("eliminar, eliminar", categoria, i, slidingItem);

    if (window.confirm("Seguro que quieres eliminar?")) {
      this.categoriaService.eliminarCategoria(this.categorias.cat_id)
        .subscribe(() => {
          this.categorias.splice(i, 1);
          slidingItem.close();
          this.ionViewWillEnter();
          console.log("Categoria eliminada!");
        });
    }
  }
 */
}
