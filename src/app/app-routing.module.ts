import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WwwComponent } from './www/www.component';
import { HomeComponent } from './www/home/home.component';
import { ContactComponent } from './www/contact/contact.component';
import { ProductComponent } from './www/product/product.component';
import { PageNotFoundComponent } from './pagenotfound/pagenotfound.component';
import {LoginGuard} from './auth/login/login.guard';
import {ProcessfilesComponent} from './dashboard/services/processfiles/processfiles.component';
import {LoginComponent} from './auth/login/login.component';
import {RegisterComponent} from './auth/register/register.component';
import {ForgotpasswordComponent} from './auth/forgotpassword/forgotpassword.component';
import {AuthGuard} from '../guards/auth.guard';
import {DashboardComponent} from './dashboard/dashboard.component';
import {Dashboardhomecomponent} from './dashboard/home/dashboardhomecomponent';


const routes: Routes = [
  { path: '', component: WwwComponent, children: [
                                                    {path: '', component: HomeComponent},
                                                    {path: 'contacto', component: ContactComponent},
                                                    {path: 'producto', component: ProductComponent},
                                                  ]},
  { path: 'login', component: LoginComponent, canActivate: [LoginGuard]},
  { path: 'register', component: RegisterComponent, canActivate: [LoginGuard]},
  { path: 'forgotpassword', component: ForgotpasswordComponent, canActivate: [LoginGuard]},
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard], canLoad: [AuthGuard],
    children: [
      {path: '', component: Dashboardhomecomponent},
      {path: 'processfile', component: ProcessfilesComponent},
    ]
  },
  { path: '404', component: PageNotFoundComponent },
  { path: '**', redirectTo: '/404' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
