import { AlertController } from "@ionic/angular";
import { Router } from "@angular/router";
import { FormBuilder, FormGroup } from "@angular/forms";
import { UsuarioService } from "./../../../services/usuario.service";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-crear-usuario",
  templateUrl: "./crear-usuario.page.html",
  styleUrls: ["./crear-usuario.page.scss"],
})
export class CrearUsuarioPage implements OnInit {
  usuario;
  crearUsuarioForm: FormGroup;

  constructor(
    private usuarioService: UsuarioService,
    private formBuilder: FormBuilder,
    private router: Router,
    private alertController: AlertController
  ) {
    this.crearUsuarioForm = this.formBuilder.group({
      usu_nombre: [""],
      usu_email: [""],
      usu_telefono: [""],
      usu_imagen: [""],
      usu_password: [""],
    });
  }

  ngOnInit() {}

  async crearUsuario() {
    console.log(this.crearUsuarioForm.value);
    let usuario = this.crearUsuarioForm.value;
    this.usuarioService.crearUsuario(usuario).subscribe((res: any) => {
      console.log(res);
      if (res.success == true) {
        this.alertController
          .create({
            header: "Usuario Creado Exitosamente!",
            buttons: ["Ok"],
          })
          .then((res) => {
            res.present();
          });
        this.router.navigate(["/admin/usuarios"]);
      }
    });
  }
  prese;
}
