import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { LoginService } from "../../services/login.service";

@Injectable({
    providedIn: 'root'
  })
  
  export class AuthGuard implements CanActivate, CanActivateChild{
  login?: boolean
  constructor(
    private loginService: LoginService,
    private router: Router,
  ){

  }
    canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        this.isLogin().subscribe((res: boolean) =>{
            this.login = res;
        })
        if(typeof this.login === "boolean" && this.login){
           return true 
        }else {
            localStorage.clear();
            setTimeout(() => window.open(`/login`, '_self'), 100);
            return false
        }
    }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        this.isLogin().subscribe((res: boolean) =>{
            this.login = res;
        })
        if(typeof this.login === "boolean" && this.login){
           return true 
        }else {
            localStorage.clear();
            setTimeout(() => window.open(`/login`, '_self'), 100);
            return false
        } 
    }
    
    isLogin(): Observable<boolean> { 
        return new Observable<boolean>((observer)=>{
          const url = this.router.url;
          const USER_ID = localStorage.getItem('USER_ID')
          const TOKEN = localStorage.getItem('ACCESS_TOKEN')
            if(!USER_ID && !TOKEN ){
             observer.next(false)
            }else observer.next(true)
        })
    }
  }