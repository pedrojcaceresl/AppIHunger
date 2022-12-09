import { UsuarioService } from "./../services/usuario.service";
import { AlertController } from "@ionic/angular";
import { Router } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "app-registro-usuario",
  templateUrl: "./registro-usuario.page.html",
  styleUrls: ["./registro-usuario.page.scss"],
})
export class RegistroUsuarioPage implements OnInit {
  registroUsuarioForm: FormGroup;

  constructor(
    private Router: Router,
    private alertCtrl: AlertController,
    public formBuilder: FormBuilder,
    private usuarioService: UsuarioService
  ) {
    this.registroUsuarioForm = this.formBuilder.group({
      nombre: ["", [Validators.required]],
      apellido: [""],
      telefono: [
        "",
        Validators.pattern(
          /^(\(\+?\d{2,3}\)[\*|\s|\-|\.]?(([\d][\*|\s|\-|\.]?){6})(([\d][\s|\-|\.]?){2})?|(\+?[\d][\s|\-|\.]?){8}(([\d][\s|\-|\.]?){2}(([\d][\s|\-|\.]?){2})?)?)$/
        ),
      ],
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required]],
      documento: ["", [Validators.required]],
    });
  }

  ngOnInit() {}

  async presentAlert(msg) {
    let alert = this.alertCtrl.create({
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

  registrar() {
    console.log(this.registroUsuarioForm.valid);
    if (this.registroUsuarioForm.valid) {
      this.usuarioService
        .registrarUsuario({
          usu: `${this.registroUsuarioForm.value.nombre} ${this.registroUsuarioForm.value.apellido}`,
          telefono: this.registroUsuarioForm.value.telefono,
          email: this.registroUsuarioForm.value.email,
          pass: this.registroUsuarioForm.value.password,
          docu: this.registroUsuarioForm.value.documento,
          rol: "usuario",
        })
        .subscribe((result) => {
          if (result.success) {
            this.presentAlert("Usuario registrado!!");
            this.Router.navigate(["/login"]);
          }
        });
    } else {
      this.presentAlert("Datos Invalidos");
    }
  }

  //   this.registroUsuarioForm = this.formBuilder.group({
  //     nombre: [''],
  //     apellido: [''],
  //     telefono: [''],
  //     email: [''],
  //     password: [''],
  //   })
  // }
}
