import { HttpClient } from "@angular/common/http";
import { ModalController } from "@ionic/angular";
import { ActivatedRoute } from "@angular/router";
import { Router } from "@angular/router";
import { FormBuilder, FormGroup } from "@angular/forms";
import { UsuarioService } from "./../services/usuario.service";
import { AdminPage } from "./../admin/admin.page";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-mi-cuenta",
  templateUrl: "./mi-cuenta.page.html",
  styleUrls: ["./mi-cuenta.page.scss"],
})
export class MiCuentaPage implements OnInit {
  id: any;
  usuario;
  editarUsuarioForm: FormGroup;
  usuarioResult;
  resultadoImagen;
  nombre;
  email;
  telefono;
  password;

  photo = "https://i.pravatar.cc/150";
  apiUrl = "http://localhost:3000/usuario/find/";
  apiUrlGet = "http://localhost:3000/upload/";

  constructor(
    private usuarioService: UsuarioService,
    private formBuilder: FormBuilder,
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public modalController: ModalController,
    public http: HttpClient
  ) {
    this.editarUsuarioForm = this.formBuilder.group({
      usu_nombre: [""],
      usu_email: [""],
      usu_telefono: [""],
      usu_password: [""],
    });
    this.id = this.activatedRoute.snapshot.paramMap.get("id");
  }

  //resss;
  ngOnInit() {
    this.getUsuario(this.id);

    console.log(this.id, "este es el iddddddd");
  }

  getUsuario(codigo: any) {
    this.usuarioService.getUsuarioById(19).subscribe((res) => {
      this.usuarioResult = res["result"];
      this.nombre = this.usuarioResult.usu_nombre;
      this.email = this.usuarioResult.usu_email;
      this.telefono = this.usuarioResult.usu_telefono;
      this.password = this.usuarioResult.usu_password;
      console.log("RESSSS", res);
    });
  }

  editarUsuario() {
    console.log("codigo id metodo update", this.id);
    this.usuarioService
      .actualizarUsuario(this.id, this.editarUsuarioForm.value)
      .subscribe((res) => {
        console.log(res);
        this.editarUsuarioForm.reset();
        this.router.navigate(["/admin"]);
      });
  }

  async openOptionSelection() {
    const modal = await this.modalController.create({
      //componente
      component: AdminPage,
      cssClass: "modal-wrapper",
    });

    modal.onDidDismiss().then((res) => {
      console.log(res);
      if (res.role !== "backdrop") {
        this.takePicture(res.data);
      }
    });
    return await modal.present();
  }

  //create a method to take a Pciture from camera and gallery
  takePicture(sourceType: number) {
    console.log("object", sourceType);
    //create options for the camera
  }
}
