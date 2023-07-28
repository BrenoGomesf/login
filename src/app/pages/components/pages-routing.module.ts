import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PasswordResetsComponent } from './password-resets/password-resets.component';
import { AuthGuard } from 'src/app/core/components/guards/auth.guard';
import { LoginPageComponent } from './login-page/login-page.component';

const routes: Routes = [
  {
    path: '',
   component: HomeComponent,
   canActivate: [AuthGuard]
  },
  {
    path: 'password_resets',
    component: PasswordResetsComponent
  },
  {
    path: 'login',
    component: LoginPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
