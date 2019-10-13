import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from "./component/home/home.component";
import {FavoritesComponent} from "./component/favorites/favorites.component";


const routes: Routes = [
  {path: 'home' , component: HomeComponent },
  {path: 'favorites' , component: FavoritesComponent },
  {path:  '**' , redirectTo: 'home' , pathMatch:'full'}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
