import { Component, ElementRef, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginAttributes } from '../../model/login_atrributes.model ';
import { Login } from '../../model/login.model';
import { LoginService } from '../../services/login.service';
import { environment } from 'src/environments/environment';
import { Utils } from 'src/app/shared/utils/utils';
import { invalid } from 'moment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  title: string = 'Seja bem vindo'
  form!: FormGroup
  viewButton : boolean = true
  message: string = ''
  recover_password: boolean = false;
  input_password: boolean = true;
  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private elementRef: ElementRef,
    private router: Router,
  ){
  }
  send_email: boolean = false;
  ngOnInit(): void {
    this.buildForm()
    localStorage.clear()
  }
  buildForm(): void {
    this.form = this.fb.group({
      email: ['', Validators.required, Validators.email],
      password: ['', Validators.required]
    });
  }
 async validForm(){
    const valid = await this.verificCampsArray(this.form)
    if(valid || this.form.value.email && this.form.value.password ){
      await this.confirm()
    }
  }
  verificCampsArray(form?: any) {
    const formGroup = form as FormGroup;
    Object.keys(formGroup.controls).forEach(campo => {
      const controle:any = formGroup.get(campo);
      controle.markAsTouched();
    });
    if (!formGroup.valid) {
      return false;
    }
  return true;
}
  
async  confirm(){
  this.viewButton = false;
  this.message = ''
  const logg = await this.buildCamps(this.form);
  await this.confirmLogin(logg).then((res:any)=> {
    this.buildStoreLocation(res)
  }).catch((err) =>{
    this.viewButton = true
    this.recover_password = true
    this.message = 'e-mail ou senha inválidos'
  })
}
  buildCamps(form: FormGroup){
    const newForm = new Login(
      new LoginAttributes(
        form.value.email,
        form.value.password
      )
    )
    return newForm
  }

  confirmLogin(data: Login): Promise<any>{
    return new Promise<any>((resolve, reject) => {
      this.loginService.login(data).subscribe({
        next: (res: any)  =>{
          resolve(res)
        }, error: (err: any) => {
          reject(err)
        }
      })
    })
  }
  buildStoreLocation(res : any){
    localStorage.setItem('USER_ID', res.data.user_id)
    localStorage.setItem('ACCESS_TOKEN', res.data.token)
    this.router.navigate(['/'])
  }
  confirmResetPassword(){
    this.input_password = false
    this.recover_password = true
    this.form.get('email')?.setValue('')
    this.title = 'Recuperrar senha'
    this.message = ''
  }
  async sendPasswordReset(){
    const validEmail = Utils.isValidEmail(this.form.controls['email'].value)
    if(validEmail){
      const body = {
        data: {
          email: this.form.controls['email'].value,
          reset_password_redirect_url: `${environment.api_front}/password_resets`
        }
      }
     this.sendRequestPassword(body)
    }else {
      this.message = 'Informe um email valido'
    }
  }

  async sendRequestPassword(data: any){
    await this.confirmPassordReset(data).then((res)=>{
      this.send_email = true
    }).catch((err)=>{
      debugger
    })
  }
  confirmPassordReset(data: any): Promise<any>{
    return new Promise<any>((resolve, reject) => {
      this.loginService.password_reset(data).subscribe({
        next: (res: any)  =>{
          resolve(res)
        }, error: (err: any) => {
          reject(err)
        }
      })
    })
  }

}
