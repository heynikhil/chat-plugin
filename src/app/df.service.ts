import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CookieService } from './cookie.service';
import { environment } from 'src/environments/environment';
import { map } from "rxjs/operators";
@Injectable({
  providedIn: 'root'
})
export class DfService {
  accessToken: any;

  constructor(private cookieService: CookieService, private http: HttpClient) {
    this.getToken()
  }

  public getToken() {
    this.http.get('http://localhost:3001/token').subscribe((response: any) => {
      this.accessToken = response.token
    })
  }

  public df_client_call(request) {
    var config = {
      headers: {
        'Authorization': "Bearer " + this.accessToken,
        'Content-Type': 'application/json; charset=utf-8'
      }
    };
   return this.http.post(
      'https://dialogflow.googleapis.com/v2/projects/' + environment.project_id +
      '/agent/sessions/' + this.cookieService.get('sessionId') + ':detectIntent',
      request,
      config
    ).pipe(map((response: any) => {
      return response.queryResult.fulfillmentText
    }))
  }

}
