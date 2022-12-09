import { AlertController } from "@ionic/angular";
import { UsuarioService } from "./../../services/usuario.service";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-usuarios",
  templateUrl: "./usuarios.page.html",
  styleUrls: ["./usuarios.page.scss"],
})
export class UsuariosPage implements OnInit {
  usuarios;
  handlerMessage;
  roleMessage;
  constructor(
    private usuarioService: UsuarioService,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    this.listarUsuarios();
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
    this.usuarioService.filtrarUsuario(data).subscribe((res) => {
      console.log(res);
      if (res) {
        this.usuarios = res.result;
      } else {
        this.usuarios = [];
      }
    });
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

  async eliminarUsuario(usuario) {
    await this.presentDialog("Seguro que quieres eliminar?");
    if (this.roleMessage === "ok") {
      console.log(usuario);
      this.usuarioService.delete(usuario).subscribe(() => {
        this.ionViewWillEnter();
      });
    } else if (this.roleMessage === "cancel") {
      this.listarUsuarios();
    }
  }
}
