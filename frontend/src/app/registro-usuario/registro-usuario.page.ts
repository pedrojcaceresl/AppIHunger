import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-registro-usuario',
  templateUrl: './registro-usuario.page.html',
  styleUrls: ['./registro-usuario.page.scss'],
})
export class RegistroUsuarioPage implements OnInit {

  registroUsuarioForm : FormGroup;

  constructor( public formBuilder : FormBuilder) { 

    this.registroUsuarioForm = this.formBuilder.group({
      nombre: [''],
      apellido: [''],
      telefono: [''],
      email: [''],
      password: [''],
    })
  }

  ngOnInit() {

  }


  registrar(){

  }
}
