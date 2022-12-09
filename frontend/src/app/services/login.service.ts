import { LocalStorageService } from "./localStorage.service";

import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { UsuarioService } from "./usuario.service";

@Injectable({
  providedIn: "root",
})
export class LoginService {
  endPoint = environment.url;
  headers = {
    "x-token": this.LocalStorageService.getString(environment.tokenKey),
  };

  constructor(
    private http: HttpClient,
    private LocalStorageService: LocalStorageService
  ) {}

  login(data) {
    console.log("from service: ", data);
    return this.http
      .post(`${this.endPoint}/usuario/login`, data, {
        headers: this.headers,
      })
      .toPromise();
  }
}
