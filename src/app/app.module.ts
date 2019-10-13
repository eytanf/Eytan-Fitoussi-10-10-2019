import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './component/header/header.component';
import { HomeComponent } from './component/home/home.component';
import { FavoritesComponent } from './component/favorites/favorites.component';
import {WeatherService} from "./service/weather.service";
import { HttpClientModule} from "@angular/common/http";
import {MatAutocompleteModule ,
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatRippleModule,
  MatIconModule
} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SingletonService} from "./service/singleton.service";


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    FavoritesComponent
  ],
  imports: [
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatRippleModule,
    MatAutocompleteModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [WeatherService , SingletonService],
  bootstrap: [AppComponent]
})
export class AppModule {

}
