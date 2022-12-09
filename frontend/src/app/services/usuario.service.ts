import { LocalStorageService } from "./localStorage.service";
import { environment } from "./../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { EventEmitter, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Usuario } from "../interfaces/Usuario";

@Injectable({
  providedIn: "root",
})
export class UsuarioService {
  admin = new EventEmitter();

  endPoint = environment.url;
  headers = {
    "x-token": this.LocalStorageService.getString(environment.tokenKey),
  };
  constructor(
    public http: HttpClient,
    private LocalStorageService: LocalStorageService
  ) {}

  public listarUsuarios(): Observable<any> {
    return this.http.get(`${this.endPoint}/usuarios`, {
      headers: this.headers,
    });
  }

  public recuperar(email): Observable<any> {
    return this.http.get(`${this.endPoint}/usuario/recuperar/${email}`, {
      headers: this.headers,
    });
  }

  public filtrarUsuario(texto: String): Observable<any> {
    console.log(texto);
    return this.http.get(`${this.endPoint}/usuario/filter/?q=${texto}`, {
      headers: this.headers,
    });
  }

  getUsuarioById(id): Observable<any> {
    return this.http.get(`${this.endPoint}/usuario/find/${id}`, {
      headers: this.headers,
    });
  }

  crearUsuario(usuario) {
    const url = `${this.endPoint}/usuario/create`;
    return this.http.post(url, usuario);
  }

  public update(id, data): Observable<any> {
    return this.http.put(`${this.endPoint}/usuario/update/${id}`, data, {
      headers: this.headers,
    });
  }

  public delete(id): Observable<any> {
    return this.http.delete(`${this.endPoint}/usuario/remove/${id}`, {
      headers: this.headers,
    });
  }
  public registrarUsuario(data): Observable<any> {
    return this.http.post(`${this.endPoint}/usuario/registrar`, data, {
      headers: this.headers,
    });
  }
  public registrarUsuarioAdmin(data): Observable<any> {
    return this.http.post(`${this.endPoint}/usuario/registrar/adm`, data, {
      headers: this.headers,
    });
  }
}
