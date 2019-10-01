import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './login/login.component';
import {LoginGuardService} from './services/login-guard.service';
import {OrderComponent} from './order/order.component';
import {AuthGuardService} from './services/auth-guard.service';


const routes: Routes = [
  {path: 'login', component: LoginComponent, canActivate: [LoginGuardService]},
  {path: 'order', component: OrderComponent, canActivate: [AuthGuardService]},
  {path: '**', redirectTo: 'login'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
