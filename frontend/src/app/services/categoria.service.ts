import { Categoria } from "./../interfaces/Categoria";
import { LocalStorageService } from "./localStorage.service";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class CategoriaService {
  endPoint = environment.url;
  //headers ={"x-token":this.LocalStorageService.getString(environment.tokenKey)};
  constructor(
    public http: HttpClient,
    private LocalStorageService: LocalStorageService
  ) {}

  public get(): Observable<any> {
    return this.http.get(`${this.endPoint}/categorias/get`);
  }

  public filtrarCategoria(text: String): Observable<any> {
    return this.http.get(`${this.endPoint}/categorias/getFilter/` + text);
  }

  public getCategoriaById(id: number): Observable<any> {
    return this.http.get(`${this.endPoint}/categorias/getById/` + id);
  }

  public crearCategoria(data: Observable<Categoria[]>): Observable<any> {
    return this.http.post<Categoria[]>(`${this.endPoint}/categorias/add`, data);
  }

  public actualizarCategoria(data: Observable<Categoria[]>): Observable<any> {
    return this.http.put<Categoria[]>(
      `${this.endPoint}/categorias/update`,
      data
    );
  }

  public eliminarCategoria(id: Observable<Categoria[]>) {
    return this.http.delete<Categoria[]>(
      `${this.endPoint}/categorias/delete/` + id
    );
  }
}
