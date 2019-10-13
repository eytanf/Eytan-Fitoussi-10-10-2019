import { Component, OnInit } from '@angular/core';
import {WeatherService} from "../../service/weather.service";
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

const fahrenheitToCelsius = require('fahrenheit-to-celsius');
import {SingletonService} from "../../service/singleton.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  enumDate = {1: 'Monday' , 2: 'Tuesday' , 3: 'Wednesday' ,4: 'Thursday' ,5: 'Friday' ,6: 'Saturday' , 0: 'Sunday' };

  // Control variables for input
  myControl = new FormControl();
  options: string[] = [];
  filteredOptions: Observable<string[]>;
  keysAndCities = {};

  // Boolean to wait until api is back
  autoCompleteApiBack: boolean = false;

  // Var to save received data
  city: string = 'Tel Aviv';
  temperature: number = 0;
  day = [];
  weekTemperature = [];
  weekSunState = [];

  // Boolean to check if city in favorite
  isFavorite: boolean = false;

  // Boolean to raise error if input is wrong
  wrongCity: boolean = false;


  constructor(private weather: WeatherService
  ,private singleton: SingletonService) { }

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges;
    if(this.singleton.city){
      this.myControl.setValue(this.singleton.city);
      this.getFiveDaysOfDailyForecasts();
    }
    else{
      if(this.singleton.day.length > 0){
        this.temperature = this.singleton.weekTemperature[0];
        this.day = this.singleton.day;
        this.weekTemperature = this.singleton.weekTemperature;
        this.singleton.favorites.filter(obj => {
          if(obj.city === this.city){
            this.isFavorite = true;
          }
        });
      }
      else{
        this.getFiveDaysOfDailyForecasts();
      }
    }
  }

  // Get autocomplete for all available cities in api
  getAutoComplete(){
    if(this.myControl.value !== '' && this.myControl.value !== ' '){
      this.weather.getAutoCompleteSearch(this.myControl.value).subscribe((cities : any) => {
        this.options = [];
        cities.forEach((city) => {
          this.options.push(city.LocalizedName);
          this.keysAndCities[city.LocalizedName] = city.Key;
        })
        this.filteredOptions = this.myControl.valueChanges
          .pipe(
            startWith(''),
            map(value => this._filter(value))
          );
        this.autoCompleteApiBack = true;
        }
      )
    }
  }

  // Get current condition for tel aviv
  getCurrentConditions(){
    this.weather.getCurrentConditions().subscribe((res) => {
      console.log(res)
    })
  }

  // Get 5 days of weather given city
  getFiveDaysOfDailyForecasts(){
    this.wrongCity = false;
    let key;
    let i = 0;
    if(this.myControl.value){
      key = this.keysAndCities[this.myControl.value];
    }
    else{
      key = '234337'; // Tel aviv key
    }
    this.singleton.favorites.filter(obj => {
      if(obj.city === this.city){
        this.isFavorite = true;
      }
    });
    //Temp
    this.singleton.favorites.filter(obj => {
      if(obj.city === this.city){
        this.isFavorite = true;
      }
    });
    this.weather.getFiveDaysOfDailyForecasts(key).then((forecast : any) => {
      // Check if the city is already in favorites
      this.singleton.favorites.filter(obj => {
        if(obj.city === this.city){
          this.isFavorite = true;
        }
      });
      // Set variables to show on screen
      forecast.DailyForecasts.forEach((day) => {
        this.day[i] = this.utcDayToWeekDay(day.EpochDate);
        this.weekTemperature[i] = parseInt(fahrenheitToCelsius(day.Temperature.Maximum.Value) , 0);
        this.weekSunState[i] = day.Day.PrecipitationType;
        ++i;
      })
      if(this.myControl.value){
        this.isFavorite = false;
        this.city = this.myControl.value;
      }
      // Set today and singleton
      this.temperature = this.weekTemperature[0];
      this.singleton.day = this.day;
      this.singleton.weekTemperature = this.weekTemperature;
    }).catch(err => {
      this.wrongCity = true;
    })
  }

  // Convert utc day to week day
  utcDayToWeekDay(utcDate){
    const date = new Date(utcDate * 1000);
    return this.enumDate[date.getUTCDay()];
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  // Set city weather to favorite and store it in singleton
  setFavorite(){
    if(this.isFavorite){
      this.isFavorite = false;
      this.singleton.favorites = this.singleton.favorites.filter(obj => obj.city !== this.city);
      console.log(this.singleton.favorites)
    }
    else{
      this.isFavorite = true;
      const favoriteToPush = {
        city: this.city,
        temperature: this.weekTemperature[0],
        sunType: this.weekSunState[0]
      }
      this.singleton.favorites.push(favoriteToPush);
      console.log(this.singleton.favorites)
    }
  }
}
