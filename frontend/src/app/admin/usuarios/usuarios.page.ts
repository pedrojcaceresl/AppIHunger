import { UsuarioService } from './../../services/usuario.service';
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-usuarios",
  templateUrl: "./usuarios.page.html",
  styleUrls: ["./usuarios.page.scss"],
})
export class UsuariosPage implements OnInit {
  usuarios;
  constructor(
    private usuarioService : UsuarioService
  ) {}

  ngOnInit() {
    this.listarUsuarios();
    this.buscarUsuario(event);
  }

  ionViewWillEnter() {
    this.listarUsuarios();
  }

  listarUsuarios() {
    this.usuarioService.listarUsuarios().subscribe((data) => {
      this.usuarios = data.result;
    });
  }

  buscarUsuario(event) {
    const data = event.detail.value;
    console.log(data);
    this.usuarioService.filtrarUsuario(data).subscribe((res) => {
      console.log(res);
      if (res) {
        this.usuarios = res["usuario"];
      } else {
        this.usuarios = [];
      }
    });
  }

   eliminarUsuario(usuario, i, slidingItem) {
      this.usuarioService.eliminarUsuarioService(usuario.usu_codigo)
        .subscribe(() => {
          this.usuarios.splice(i, 1);
          slidingItem.close();
          this.ionViewWillEnter();
        });
  }
}
