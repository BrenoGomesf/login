import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
 
 
title = 'anexo-juridico-admin'
login: boolean = false;
constructor(
  private router: Router
){}

ngOnInit() {
  //this.loadCamps()
}
async loadCamps(){
  await Promise.allSettled([this.verficationLogin()]).then((data) =>{
    if(data.every((item: any) => item.status == 'fulfilled')){
    }
  }).catch(()=> {
  })
}
  verficationLogin() {
    this.isLogin().subscribe((res: boolean) =>{
    this.login = res;
    })
}
  isLogin(): Observable<boolean> { 
    return new Observable<boolean>((observer)=>{
      const url = this.router.url;
      debugger
      const USER_ID = localStorage.getItem('USER_ID')
      const TOKEN = localStorage.getItem('ACCESS_TOKEN')
        if(!USER_ID && !TOKEN ){
         observer.next(false)
        }else observer.next(true)
    })
}

}
