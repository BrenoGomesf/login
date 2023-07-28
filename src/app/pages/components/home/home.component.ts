import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/core/services/login.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  constructor(
    private loginService : LoginService
  ){

  }
  ngOnInit(): void {
  }

  async deslog(){
    const USER_ID = localStorage.getItem('USER_ID');
    const ACCESS_TOKEN = localStorage.getItem('ACCESS_TOKEN'); 
    await this.deslogService(USER_ID, ACCESS_TOKEN).then((res)=>{
      localStorage.removeItem('USER_ID');
      localStorage.removeItem('ACCESS_TOKEN');
      window.location.reload()
    }).catch((err)=>{
      debugger
    })
  }
  deslogService(USER_ID ?: any, access_token?: any):Promise<any> {
    return new Promise<any>((resolve, reject) =>{
      this.loginService.deslog(USER_ID, access_token).subscribe({
        next:(data)=>{
        resolve(data)
        },
        error:(err)=>{  
          reject(err);
          }
      })
    })
  }

}
