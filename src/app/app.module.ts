import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ZipcodeFormComponent } from './main/components/zipcode-form/zipcode-form.component';
import { WeatherCardComponent } from './main/components/weather-card/weather-card.component';
import { MainComponent } from './main/main.component';
import { ForecastComponent } from './forecast/forecast.component';
import { HttpClientModule } from '@angular/common/http';
import { WeatherService } from './services/weather.service';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  declarations: [
    AppComponent,
    MainComponent,
    ZipcodeFormComponent,
    WeatherCardComponent,
    ForecastComponent,
  ],
  providers: [WeatherService],
  bootstrap: [AppComponent],
})
export class AppModule {}
