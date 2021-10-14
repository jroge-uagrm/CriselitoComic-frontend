import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {Constants} from './Constants';
import {HomeComponent} from './components/home/home.component';


const routes: Routes = [
  { 
    path:"",
    pathMatch:"full",
    redirectTo:Constants.ROUTE_HOME
  },
  {
    path:Constants.ROUTE_HOME,
    component: HomeComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }