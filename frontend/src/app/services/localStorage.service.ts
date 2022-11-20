import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Usuario } from "../interfaces/Usuario";

@Injectable({
  providedIn: "root",
})
export class LocalStorageService {
  constructor() {}

  public getItem(key: string) {
    let item = localStorage.getItem("key");
    return item ? JSON.parse(item) : [];
  }

  public setItem(key: string, object: any) {
    localStorage.setItem(key, JSON.stringify(object));
  }

  public clearItem() {
    localStorage.clear();
  }

  public removeItem(key: string) {
    localStorage.removeItem(key);
  }

  public getJSON(key: string) {
    let item = localStorage.getItem(key);
    return item ? JSON.parse(item) : [];
  }
}
