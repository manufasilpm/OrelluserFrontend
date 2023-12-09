import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistrationComponent } from './pages/registration/registration.component';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

const routes: Routes = [
  {
    path: '*',
    redirectTo:'registration',
    pathMatch:'full'
  },
  {
    path: 'registration',
    component: RegistrationComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'dashBoard',
    component: DashboardComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
