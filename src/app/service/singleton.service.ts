import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SingletonService {

  city: string;
  day = [];
  weekTemperature = [];
  favorites = [];

  constructor() { }
}
