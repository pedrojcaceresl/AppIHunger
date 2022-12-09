import { Producto } from "../interfaces/Producto";
import { LocalStorageService } from "./localStorage.service";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class ProductoService {
  endPoint = environment.url;
  //headers ={"x-token":this.LocalStorageService.getString(environment.tokenKey)};

  constructor(public http: HttpClient) {}

  public get(): Observable<any> {
    return this.http.get(`${this.endPoint}/productos`);
  }

  public filtrarProducto(text: String): Observable<any> {
    return this.http.get(`${this.endPoint}/producto/getFilter/` + text);
  }

  public getProductoById(id: number): Observable<any> {
    return this.http.get(`${this.endPoint}/producto/getById/` + id);
  }

  public crearProducto(data: Observable<Producto[]>): Observable<any> {
    return this.http.post<Producto[]>(`${this.endPoint}/producto/add`, data);
  }

  public actualizarProducto(data: Observable<Producto[]>): Observable<any> {
    return this.http.put<Producto[]>(`${this.endPoint}/producto/update`, data);
  }

  public delete(id): Observable<any> {
    return this.http.delete(`${this.endPoint}/producto/delete/${id}`);
  }
}
