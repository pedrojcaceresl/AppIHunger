import { LocalStorageService } from "./localStorage.service";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class ComprobanteService {
  endPoint = environment.url;
  headers = {
    "x-token": this.LocalStorageService.getString(environment.tokenKey),
  };
  constructor(
    public http: HttpClient,
    private LocalStorageService: LocalStorageService
  ) {}

  public get(): Observable<any> {
    return this.http.get(`${this.endPoint}/comprobante/list`);
  }
}
