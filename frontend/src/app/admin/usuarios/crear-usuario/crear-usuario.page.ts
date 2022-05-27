import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UsuarioService } from './../../../services/usuario.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-crear-usuario',
  templateUrl: './crear-usuario.page.html',
  styleUrls: ['./crear-usuario.page.scss'],
})
export class CrearUsuarioPage implements OnInit {

  usuario;
  crearUsuarioForm: FormGroup;

  constructor(
    private usuarioService: UsuarioService,
    private formBuilder: FormBuilder,
    private router: Router
    ) {

      this.crearUsuarioForm = this.formBuilder.group({
        usu_nombre: [''],
        usu_email: [''],
        usu_telefono: [''],
        usu_password: [''],
      })
     }

  ngOnInit() {
  }

  crearUsuario(){
    console.log(this.crearUsuarioForm.value);
    let usuario = this.crearUsuarioForm.value;
    this.usuarioService.crearUsuario(usuario).subscribe((res) => { 
      console.log(res);
      this.goOut();
     /*  if(res.success == true){
        this.router.navigate(['/admin/usuarios']);
      } */
    });
  }

  goOut(){
    this.router.navigate(['/admin']);
  }

}
