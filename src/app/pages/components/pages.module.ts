import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { HomeComponent } from './home/home.component';
import { CoreModule } from 'src/app/core/core.module';
import { PasswordResetsComponent } from './password-resets/password-resets.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    HomeComponent,
    PasswordResetsComponent,
    LoginPageComponent,
  ],
  imports: [
    CoreModule,
    CommonModule,
    PagesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class PagesModule { }
