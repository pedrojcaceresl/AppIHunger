import { Router } from '@angular/router';
import { UsuarioService } from './../services/usuario.service';
import { AuthenticationService } from './../services/authentication.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController } from '@ionic/angular';
interface CREDENTIALS  {
  usu_email: any;
  usu_password: any;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;

  credentials : CREDENTIALS;

  constructor(
    private formsBuilder: FormBuilder,
    private authService: AuthenticationService,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private usuarioService: UsuarioService,
    public router: Router
  ) {
    this.loginForm = this.formsBuilder.group({
      usu_email: [''],
      usu_password: [''],
    });
  }

  ngOnInit() {
    // console.log(this.loginForm);
  }


  async login() {
    const loading = await this.loadingController.create();
    await loading.present();
    this.credentials = {
      'usu_email' : this.loginForm.value.usu_email,
      'usu_password' :  this.loginForm.value.usu_password
    }
   this.authService.login(this.credentials).subscribe(
      async (res) => {
        await loading.dismiss();
        this.router.navigate(['/home']);
        const alert = await this.alertController.create({
          header: 'Bienvenido a iHunger!',
          message: 'Bienvenido a iHunger!',
          buttons: ['OK'],
        });
      },
      async (res) => {
        await loading.dismiss();
        const alert = await this.alertController.create({
          header: 'Error al iniciar sesion',
          message: res.error.error,
          buttons: ['OK'],
        });

        await alert.present();
      }
    ); 
  }


}
