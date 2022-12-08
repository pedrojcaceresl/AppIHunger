import { FormasPagoService } from "./../../../services/formas-pago.service";
import { AlertController } from "@ionic/angular";
import { Router } from "@angular/router";
import { FormGroup, FormBuilder } from "@angular/forms";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-pagos-create",
  templateUrl: "./pagos-create.page.html",
  styleUrls: ["./pagos-create.page.scss"],
})
export class PagosCreatePage implements OnInit {
  registroUsuarioForm: FormGroup;

  constructor(
    private Router: Router,
    private alertCtrl: AlertController,
    public formBuilder: FormBuilder,
    private UsuarioService: FormasPagoService
  ) {
    this.registroUsuarioForm = this.formBuilder.group({
      descripcion: [""],
      imagen: [""],
      nombre: [""],
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
    this.UsuarioService.create({
      fp_descripcion: this.registroUsuarioForm.value.descripcion,
    }).subscribe((result) => {
      if (result.success) {
        this.presentAlert("Método de pago registrado!");
        this.Router.navigate(["/admin/pagos-list"]);
      }
    });
  }
}
