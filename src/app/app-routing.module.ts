import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './shared/Components/home/home.component';
import { BookComponent } from './shared/Components/book/book.component';
import { StatusComponent } from './shared/Components/status/status.component';
import { LoginComponent } from './shared/Components/login/login.component';

const routes: Routes = [
  {path : '', component: HomeComponent},
  {path : 'book', component: BookComponent},
  {path : 'status', component: StatusComponent},
  {path : 'login', component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
