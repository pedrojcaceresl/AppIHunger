import { LocalStorageService } from "./localStorage.service";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class FormasPagoService {
  endPoint = environment.url;
  headers = {
    "x-token": this.localStorageService.getString(environment.tokenKey),
  };
  constructor(
    public http: HttpClient,
    private localStorageService: LocalStorageService
  ) {}

  public get(): Observable<any> {
    return this.http.get(`${this.endPoint}/pagos/get`, {
      headers: this.headers,
    });
  }

  public getById(id): Observable<any> {
    return this.http.get(`${this.endPoint}/pagos/getById/${id}`, {
      headers: this.headers,
    });
  }

  public update(categoria): Observable<any> {
    return this.http.put(`${this.endPoint}/pagos/update`, categoria, {
      headers: this.headers,
    });
  }

  public delete(id): Observable<any> {
    return this.http.delete(`${this.endPoint}/pagos/delete/${id}`, {
      headers: this.headers,
    });
  }

  public create(categoria): Observable<any> {
    return this.http.post(`${this.endPoint}/pagos/add`, categoria, {
      headers: this.headers,
    });
  }
}
