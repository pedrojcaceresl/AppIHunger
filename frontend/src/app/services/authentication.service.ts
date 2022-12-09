import { LocalStorageService } from "./localStorage.service";
import { environment } from "src/environments/environment";
/* eslint-disable arrow-body-style */
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Storage } from "@capacitor/storage";
import { BehaviorSubject, from, Observable } from "rxjs";
import { map, switchMap, tap } from "rxjs/operators";

const TOKEN_KEY = environment.tokenKey;
const endPoint = environment.url;

@Injectable({
  providedIn: "root",
})
export class AuthenticationService {
  isAuthenticated: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    null
  );
  constructor(
    private http: HttpClient,
    private localStorageService: LocalStorageService
  ) {
    this.loadToken();
  }

  endPoint = environment.url;
  headers = {
    "x-token": this.localStorageService.getString(environment.tokenKey),
  };

  token = "";

  async loadToken() {
    const token = this.headers["x-token"];
    if (token && token["x-token"]) {
      console.log("set token:", token["x-token"]);
      this.token = token["x-token"];
      this.isAuthenticated.next(true);
    } else if (!token) {
      this.isAuthenticated.next(true);
    }
  }

  login(credentials) {
    console.log("TOOOOOKEN", this.token, "credentials", credentials);
    return this.http
      .post(`${endPoint}/usuario/login`, credentials, { headers: this.headers })
      .toPromise()
      .then((res) => {
        console.log("EL RESULTADOOOOOOO ", res);
        this.isAuthenticated.next(true);
        return res;
      });
  }

  logout() {
    this.isAuthenticated.next(false);
    this.localStorageService.clear();
  }
}
