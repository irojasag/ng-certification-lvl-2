import { Component, Input, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { WeatherService } from '../../../services/weather.service';

@Component({
  selector: 'weather-card',
  templateUrl: './weather-card.component.html',
  styleUrls: ['./weather-card.component.css'],
})
export class WeatherCardComponent implements OnInit {
  @Input('zipcode') public zipcode: string;
  @Input('refreshSubject') public refreshSubject: BehaviorSubject<boolean>;

  public weather: any;

  constructor(private weatherService: WeatherService) {}

  ngOnInit(): void {
    this.weatherService
      .getZipcodeWeather(this.zipcode)
      .subscribe((response) => {
        const main = response.weather.pop().main;
        this.weather = {
          name: response.name,
          zipcode: this.zipcode,
          current: response.main.temp,
          max: response.main.temp_max,
          min: response.main.temp_min,
          main,
          icon:
            {
              Clouds: 'clouds',
              Drizzle: 'rain',
              Thunderstorm: 'rain',
              Snow: 'snow',
              Clear: 'sun',
            }[main] || 'sun',
        };
      });
  }

  public removeZipcode(): void {
    const currentZipcodes = JSON.parse(
      window.localStorage.getItem('zipcodes') || '[]'
    );

    window.localStorage.setItem(
      'zipcodes',
      JSON.stringify([
        ...new Set(
          currentZipcodes.filter((zipcode) => zipcode !== this.zipcode)
        ),
      ])
    );
    this.refreshSubject.next(true);
  }
}
