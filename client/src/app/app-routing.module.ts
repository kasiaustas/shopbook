import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LoginPageComponent} from "./login-page/login-page.component";
import {RegisterPageComponent} from "./register-page/register-page.component";
import {MainPageComponent} from "./main-page/main-page.component";
import {SiteLayoutComponent} from "./shared/layouts/site-layout/site-layout.component";
import {AccountPageComponent} from "./account-page/account-page.component";
import {AuthGuard} from "./shared/classes/auth.guard";

const routes: Routes = [
  {
    path: 'login',
    component: LoginPageComponent
  },
  {
    path: 'register',
    component: RegisterPageComponent
  },
  {
    path: 'account',
    component: AccountPageComponent,
    canActivate:[AuthGuard]
  },
  {
    path: '',
    component: SiteLayoutComponent,
  //  canActivate:[AuthGuard],
    children: [
      {path: '', component: MainPageComponent}
    ]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
