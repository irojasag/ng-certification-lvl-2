import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WeatherService } from '../services/weather.service';

@Component({
  selector: 'forecast',
  templateUrl: './forecast.component.html',
  styleUrls: ['./forecast.component.css'],
})
export class ForecastComponent implements OnInit {
  public forecast: any;
  constructor(
    private weatherService: WeatherService,
    private acitvatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.acitvatedRoute.params.subscribe((params) => {
      if (params.zipcode) {
        this.weatherService
          .getZipcodeForecast(params.zipcode)
          .subscribe((response) => {
            console.log(response);
            this.forecast = { name: response.city.name, list: [] };

            for (let i = 0; i < 5; i++) {
              const arr = response.list.slice(8 * i, 8 * i + 8);
              const date = new Date(arr[0].dt_txt);
              const main = arr[0].weather.pop().main;
              const icon =
                {
                  Clouds: 'clouds',
                  Drizzle: 'rain',
                  Thunderstorm: 'rain',
                  Snow: 'snow',
                  Clear: 'sun',
                }[main] || 'sun';

              let min = arr[0].main.temp_min;
              let max = arr[0].main.temp_max;

              for (let j = 1; j < 8; j++) {
                if (min > arr[j].main.temp_min) {
                  min = arr[j].main.temp_min;
                }
                if (max < arr[j].main.temp_max) {
                  max = arr[j].main.temp_max;
                }
              }
              this.forecast.list.push({
                main,
                icon,
                min,
                max,
                date,
              });
            }
          });
      }
    });
    // this.weatherService.getZipcodeForecast()
  }
}
