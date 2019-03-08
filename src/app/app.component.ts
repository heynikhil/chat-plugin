import { Component, OnInit, ElementRef, ViewEncapsulation } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { HttpClient } from '@angular/common/http';

import { CookieService } from './cookie.service';
import * as uuid from 'uuid';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    trigger("openClose", [
      state("open", style({
        opacity: 1
      })
      ),
      state("closed", style({
        opacity: 0
      })
      ),
      transition("open => closed", [
        style({ "transform-origin": "right bottom 0", }),
        animate("500ms cubic-bezier(0,0.1,0.5,1)")]),

      transition("closed => open", [
        // style({ transform: "scale(-0.1,-0.5)" }),
        style({ transform: "scale(0)", "transform-origin": "right bottom 0", }),
        animate("1000ms cubic-bezier(0.5,0.1,0.5,1)")
      ])
    ])

  ]
})
export class AppComponent {
  messageText: any
  message: string;
  messages: any = [];
  isOpen: boolean = true;
  showTime: boolean = false;
  _sessionId: string;
  accessToken: any;
  constructor(private cookieService: CookieService, private http: HttpClient) {
    this._sessionId = cookieService.get("sessionId");
    this.http.get('http://localhost:3001/token').subscribe((response: any) => {
      console.log(response);
      this.accessToken = response.token
    }, error => {
      console.log(error);

    })
  }
  ngOnInit() {
    if (!this.cookieService.get('sessionId')) {
      this.cookieService.set('sessionId', uuid.v4());
    }
  }
  async sendMessage(e) {
    if (this.message) {
      let payload = {
        text: this.message,
        by: 'user',
      }
      this.messages.push(payload);
      const request = {
        queryInput: {
          text: {
            text: this.message,
            languageCode: 'en-US',
          },
        }
      };
      await this.df_client_call(request)
      this.message = '';
    }
  }
  async df_client_call(request) {
    var config = {
      headers: {
        'Authorization': "Bearer " + this.accessToken,
        'Content-Type': 'application/json; charset=utf-8'
      }
    };
    console.log(config);

    this.http.post(
      'https://dialogflow.googleapis.com/v2/projects/' + environment.project_id +
      '/agent/sessions/' + this.cookieService.get('sessionId') + ':detectIntent',
      request,
      config
    ).subscribe((response: any) => {
      console.log(response);
      this.messages.push({
        text: response.queryResult.fulfillmentText,
        by: 'bot',
      })
    }, error => {
      console.log(error);
    })
  }
}
