import { Component, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { OidcSecurityService } from 'angular-auth-oidc-client';

@Component({
  selector: 'app-fetch-data',
  templateUrl: './fetch-data.component.html'
})

export class FetchDataComponent {
  public forecasts: WeatherForecast[];

  constructor(oidcSecurityService: OidcSecurityService, http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    const token = oidcSecurityService.getToken();

    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      }),
    };

    http.get<WeatherForecast[]>(baseUrl + 'weatherforecast', httpOptions).subscribe(result => {
      this.forecasts = result;
    },
      error =>
        console.error(error));
  }
}

interface WeatherForecast {
  date: string;
  temperatureC: number;
  temperatureF: number;
  summary: string;
}
