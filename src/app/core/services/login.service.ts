import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable, Type } from "@angular/core";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  url = `${environment.api}`
  constructor(
    private http: HttpClient,
    private router: Router,
  ) { }

  login(data: any) {
    const url = `${this.url}/api/v1/access_tokens`;
  
  const headers = new HttpHeaders()
    .set('Content-Type', 'application/json')
    .set('Authorization', 'AnxJur-Token api_key=1:my_api_key');

  return this.http.post<any>(url, data, { headers })
  }
  deslog(USER_ID ?: string,  ACCESS_TOKEN ?: string){
    const url = `${this.url}/api/v1/access_tokens`;
    const headers = new HttpHeaders()
    .set('Content-Type', 'application/json')
    .set('Authorization', `AnxJur-Token access_token=${USER_ID}:${ACCESS_TOKEN}`);
  return this.http.delete<any>(url, { headers })
  }
  password_reset(data: any){
    const url = `${this.url}/api/v1/password_resets`;
    const headers = new HttpHeaders()
    .set('Content-Type', 'application/json')
    .set('Authorization', 'AnxJur-Token api_key=1:my_api_key');
    return this.http.post<any>(url,data, { headers })
  }
  newPasswordReset(token: string, data: any){
    const url = `${this.url}/api/v1/password_resets/${token}`;
    const headers = new HttpHeaders()
    .set('Content-Type', 'application/json')
    .set('Authorization', 'AnxJur-Token api_key=1:my_api_key');
    return this.http.patch<any>(url,data, { headers })
  }

  isLogin(): Observable<boolean> { 
    return new Observable<boolean>((observer)=>{
      const USER_ID = localStorage.getItem('USER_ID')
      const TOKEN = localStorage.getItem('ACCESS_TOKEN')
        if(!USER_ID && !TOKEN ){
         observer.next(false)
        }else observer.next(true)
    })
  }
}
