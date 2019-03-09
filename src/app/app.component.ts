import { Component} from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { HttpClient } from '@angular/common/http';
import { CookieService } from './cookie.service';
import * as uuid from 'uuid';
import { DfService } from './df.service';

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
  message: string;
  messages: any = [];
  isOpen: boolean = true;
  _sessionId: string;
  constructor(private cookieService: CookieService, private http: HttpClient, private df: DfService) {
    this._sessionId = cookieService.get("sessionId");
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
      this.message = '';
      this.df.df_client_call(request).subscribe(response => {
        this.messages.push({
          text: response,
          by: 'bot',
        })
      })

    }
  }

}
