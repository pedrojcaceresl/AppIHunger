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

  /**Get a String from the local storage
   * Receives a key as a parameters
   * Returns a string
   */
  public getString(key: string) {
    let item = localStorage.getItem(key);
    return item ? item : "";
  }

  public setItem(key: string, object: any) {
    localStorage.setItem(key, JSON.stringify(object));
  }

  public setS(key: string, object: any) {
    localStorage.setItem(key, object);
  }

  public clear() {
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
