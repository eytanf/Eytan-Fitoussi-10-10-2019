import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  apiKey: string = 'LB0cZ9rOFlrOsQnWEr0rRJoERFy8501Z';

  constructor(private http: HttpClient) { }

  // Returns basic information about locations matching an autocomplete of the search text.
  getAutoCompleteSearch(location){
    return this.http.get(`http://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=${this.apiKey}&q=${location}`);
  }

  // Returns current conditions data for a specific location.
  // Current conditions searches require a location key.
  getCurrentConditions(){
    return this.http.get(`http://dataservice.accuweather.com/currentconditions/v1/234337?apikey=${this.apiKey}`);
  }

  //Returns an array of daily forecasts for the next 5 days for a specific location.
  getFiveDaysOfDailyForecasts(cityKey){
    return this.http.get(`http://dataservice.accuweather.com/forecasts/v1/daily/5day/${cityKey}?apikey=${this.apiKey}`).toPromise();
  }
}
