import { HttpClient } from "@angular/common/http";
import { AdminPage } from "./../../admin.page";
import { FormBuilder, FormGroup } from "@angular/forms";
import { UsuarioService } from "./../../../services/usuario.service";
import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { DomSanitizer, SafeResourceUrl } from "@angular/platform-browser";
import { ModalController } from "@ionic/angular";

@Component({
  selector: "app-editar-usuario",
  templateUrl: "./editar-usuario.page.html",
  styleUrls: ["./editar-usuario.page.scss"],
})
export class EditarUsuarioPage implements OnInit {
  id: any;
  usuario;
  editarUsuarioForm: FormGroup;
  usuarioResult;
  resultadoImagen;
  nombre;
  email;
  telefono;
  password;
  imagen;

  photo = "https://i.pravatar.cc/150";

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
      usu_imagen: [""],
      usu_password: [""],
    });
    this.id = this.activatedRoute.snapshot.paramMap.get("id");
  }

  ngOnInit() {
    this.getUsuario(this.id);
  }

  getUsuario(codigo: any) {
    this.usuarioService.getUsuarioById(codigo).subscribe((res) => {
      this.usuarioResult = res.result;
      this.nombre = this.usuarioResult.usu_nombre;
      this.email = this.usuarioResult.usu_email;
      this.telefono = this.usuarioResult.usu_telefono;
      this.imagen = this.usuarioResult.usu_imagen;
      this.password = this.usuarioResult.usu_password;
    });
  }

  editarUsuario() {
    this.usuarioService
      .update(this.id, this.editarUsuarioForm.value)
      .subscribe((res) => {
        console.log(res);
        this.editarUsuarioForm.reset();
        this.router.navigate(["/admin/usuarios"]);
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

  // TODO: create a method to take a Pciture from camera and gallery
  takePicture(sourceType: number) {
    console.log("object", sourceType);
    //create options for the camera
  }
}
