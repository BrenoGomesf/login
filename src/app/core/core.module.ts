import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import { TopBarComponent } from './components/top-bar/top-bar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputErrorMsgComponent } from './components/input-error-msg/input-error-msg.component';
import { SuccessViewComponent } from './components/success-view/success-view.component';
import { ErrorViewComponent } from './components/error-view/error-view.component';


@NgModule({
  declarations: [
    LoginComponent,
    TopBarComponent,
    InputErrorMsgComponent,
    SuccessViewComponent,
    ErrorViewComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    LoginComponent,
    TopBarComponent,
    InputErrorMsgComponent,
    SuccessViewComponent,
    ErrorViewComponent
  ]
})
export class CoreModule { }
