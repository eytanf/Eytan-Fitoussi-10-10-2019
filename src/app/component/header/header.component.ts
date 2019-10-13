import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  //Ng class for button styles (change on click)
  homeStyle = "";
  favoriteStyle = "";

  constructor(private router: Router) { }

  ngOnInit() {
    const path = window.location.href.split('/')[3];
    if(path === 'home' || path === ''){
      this.homeStyle = "lightBlue";
    }
    else if(path === 'favorites'){
      this.favoriteStyle = "lightBlue";
    }
  }

  // Navigate to Home page
  navigateToHome(){
    this.favoriteStyle = "";
    this.homeStyle = "lightBlue";
    this.router.navigate(['home'])
  }

  //Navigate to Favorites page
  navigateToFavorites(){
    this.homeStyle = "";
    this.favoriteStyle = "lightBlue";
    this.router.navigate(['favorites'])
  }

}
