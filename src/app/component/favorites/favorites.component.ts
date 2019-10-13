import { Component, OnInit } from '@angular/core';
import {SingletonService} from "../../service/singleton.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit {

  favorites = [];

  constructor(private singleton: SingletonService,
              private router: Router) { }

  ngOnInit() {
    if(this.singleton.favorites.length > 0){
      this.favorites = this.singleton.favorites;
    }
  }

  deleteFromFavorites(city){
    this.singleton.favorites = this.singleton.favorites.filter(obj => obj.city != city);
    this.favorites = this.singleton.favorites;
  }

  moveToHome(city){
    this.singleton.city = city;
    this.router.navigate(['home'])
  }

}
