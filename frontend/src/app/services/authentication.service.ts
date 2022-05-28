import { environment } from 'src/environments/environment';
/* eslint-disable arrow-body-style */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@capacitor/storage';
import { BehaviorSubject, from, Observable } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';

const TOKEN_KEY = 'my-token';
const endPoint = environment.url;

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  isAuthenticated: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(null);
  token = '';
  constructor(private http: HttpClient) {
    this.loadToken();
   }

  async loadToken(){
    const token = await Storage.get({key: TOKEN_KEY});
    if (token && token.value){
      console.log('set token:',token.value);
      this.token = token.value;
      this.isAuthenticated.next(true);
    }else{
      this.isAuthenticated.next(false);
    }
  }

 login(credentials: {usu_email; usu_password}): Observable<any>{
    console.log('TOOOOOKEN',TOKEN_KEY, 'credentials',credentials);
    return this.http.post(`${endPoint}/usuario/login`, credentials).pipe(
      map((data: any) =>data.token),
      switchMap(token =>{
        return from(Storage.set({key: TOKEN_KEY, value: token}));
      }),
      tap(_ =>{
        this.isAuthenticated.next(true);
      })
    );
  } 

  logout(): Promise<void>{
    this.isAuthenticated.next(false);
    return Storage.remove({key: TOKEN_KEY});
  }
}
