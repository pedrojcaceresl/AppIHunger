import { LocalStorageService } from "./localStorage.service";
import { environment } from "./../../environments/environment";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class TokenService {
  endPoint = environment.url;
  constructor(private http: HttpClient) {}

  // public static setCart(value){
  //   environment.showCart=value;
  // }

  public get(): Observable<any> {
    return this.http.get(`${this.endPoint}/token/validate`);
  }
}
