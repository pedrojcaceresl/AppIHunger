import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from '../interfaces/Usuario';


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  
  api = 'http://localhost:3000/usuario';

  constructor(public http: HttpClient) { }

  public listarUsuarios(): Observable<any>{
    const url = `${this.api}/list`;
    return this.http.get(url);
  }

  public filtrarUsuario(texto: String){
    return this.http.get(this.api+`-filter?q=${texto}`);
  }

  getUsuarioById(id: number){
    
    return this.http.get(`http://localhost:3000/usuario/find/`+id);
  }

  
  public crearUsuario(data: Observable<Usuario[]>): Observable<any>{
    
    return this.http.post<Usuario[]>(`${this.api}/create`, data);
  }

  
  actualizarUsuario(org_codigo, usuario) {
    return this.http.put('http://localhost:3000/usuario/update/' + org_codigo, usuario);
  }

 
  eliminarUsuarioService(id: Observable<Usuario[]>) {
    return this.http.delete<Usuario[]>('http://localhost:3000/usuario/remove/' + id);
  }

}
