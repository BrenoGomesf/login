import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { LoginService } from 'src/app/core/services/login.service';
import { Utils } from 'src/app/shared/utils/utils';

@Component({
  selector: 'app-password-resets',
  templateUrl: './password-resets.component.html',
  styleUrls: ['./password-resets.component.css']
})
export class PasswordResetsComponent  implements OnInit{
  token: string = ''
  viewError: boolean = false;
  form!: FormGroup
  message: string = ''
  error: any = {
    title: '',
    description: '',
    view: false
  }
  sucess: any = {
    title: '',
    description: '',
    view: false
  }
  viewBody = true;
  constructor(
    private activateRoute: ActivatedRoute,
    private fb: FormBuilder,
    private loginService: LoginService,
  ){
  this.buildForm()
  }
  ngOnInit(): void {  
    this.loadToken()
  }
  buildForm(): void {
    this.form = this.fb.group({
      password: ['', Validators.required, Validators.minLength(6)],
      password_free: ['', Validators.required, Validators.minLength(6)]
    });
  }
  loadToken(){
    this.activateRoute.queryParams.subscribe(params => {
      const resetToken = params['reset_token'];
       this.token = resetToken
    });
    if(!this.token){
      this.viewBody = false;
      this.error.view = true;
      this.error.title = 'Erro';
      this.error.description = 'Token inválido';
      //this.viewError = true;
    }
  }
  sendPassword(){
    this.message = ''
    const maxLength = 6
    const input_password = this.form.controls['password'].value
    const input_password_free = this.form.controls['password_free'].value
    if(input_password.length >= maxLength && input_password_free.length >= maxLength && input_password_free === input_password){
     this.request_new_password()
    }else if(!input_password){
      this.message = 'Confirme o primeiro campo'
    }
    else if(!input_password_free){
      this.message = 'Confirme o segundo campo'
    }else if(input_password_free != input_password){
      this.message = 'As senhas deve ser iguais'
    }
    else if(input_password_free.length != input_password.length){
      this.message = 'As senhas deve ter a mesma quantidade de caracteres'
    }
    else if(input_password.length < maxLength || input_password_free.length < maxLength ){
      this.message = 'Senha deve contenter 6 digitos'
    }
  }
  async request_new_password(){
    const body = {
      data: {
        password: this.form.controls['password'].value,
      }
    }
    debugger
    await this.send_new_password(this.token, body).then((res) =>{
      debugger
      this.viewBody = false
      this.sucess.view = true;
      this.sucess.title = 'Perfeito'
      this.sucess.description = 'Senha alterada com sucesso.'
    }).catch((res)=>{
      debugger
      this.viewBody = false;
      this.error.view = true;
      this.error.title = 'Houver um egano.'
      this.error.description = 'Token ja usado ou senha ja alterada.'
    })
  }
  send_new_password(token: string, data: any):Promise<any>{
    return new Promise((res, rej) => {
    this.loginService.newPasswordReset(token, data).subscribe({
      next(value) {
        res(value)
      },error(err) {
        rej(err)
      },
    })
    })
  }
}
