import { FormasPagoService } from "./../../../services/formas-pago.service";
import { AlertController } from "@ionic/angular";
import { ActivatedRoute } from "@angular/router";
import { Router } from "@angular/router";
import { FormGroup, FormBuilder } from "@angular/forms";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-pagos-edit",
  templateUrl: "./pagos-edit.page.html",
  styleUrls: ["./pagos-edit.page.scss"],
})
export class PagosEditPage implements OnInit {
  registroMedioPagoForm: FormGroup;
  id;
  formaDePago;
  constructor(
    private Router: Router,
    private ActivatedRoute: ActivatedRoute,
    private alertCtrl: AlertController,
    public formBuilder: FormBuilder,
    private formasDePagoService: FormasPagoService
  ) {
    this.id = this.ActivatedRoute.snapshot.paramMap.get("id");
    this.registroMedioPagoForm = this.formBuilder.group({
      descripcion: [""],
    });
  }

  ngOnInit() {
    this.formasDePagoService.getById(this.id).subscribe((data) => {
      this.formaDePago = data.result;
      console.log(data);
      this.registroMedioPagoForm = this.formBuilder.group({
        descripcion: [
          this.formaDePago && this.formaDePago.fp_descripcion
            ? this.formaDePago.fp_descripcion
            : "",
        ],
      });
    });
  }

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
    console.log(this.registroMedioPagoForm.valid);

    this.formasDePagoService
      .update({
        fp_Id: this.id,
        fp_descripcion: this.registroMedioPagoForm.value.descripcion,
      })
      .subscribe((result) => {
        if (result.success) {
          this.presentAlert("Medio de Pago Actualizado!!");
          this.Router.navigate(["/admin/pagos-list"]);
        }
      });
  }
}
