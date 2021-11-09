import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  private apiKey = '5a4b2d457ecbef9eb2a71e480b947604';
  private apiUrl = 'https://api.openweathermap.org/data/2.5/';

  constructor(private http: HttpClient) {}

  public getZipcodeWeather(zipcode: string): Observable<any> {
    return this.http.get<any>(
      `${this.apiUrl}weather?zip=${zipcode},US&appid=${this.apiKey}`
    );
  }

  public getZipcodeForecast(zipcode: string): Observable<any> {
    return this.http.get<any>(
      `${this.apiUrl}forecast?zip=${zipcode},US&appid=${this.apiKey}`
    );
  }
}
