import { Component } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { HttpClient } from '@angular/common/http';
import { CookieService } from './cookie.service';
import * as uuid from 'uuid';
import { DfService } from './df.service';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from './app.state'
import { Message } from './models/message.model'
import * as messagesAction from './actions/message.actions';

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
  public isOpen: boolean = false
  public message: string
  public messages$: Observable<Message[]>;
  public _sessionId: string;
  public isOpened: boolean = false

  constructor(
    private cookieService: CookieService,
    private store: Store<AppState>,
  ) {
    this._sessionId = cookieService.get("sessionId");
    this.messages$ = store.select('messages')
  }


  ngOnInit() {
    if (!this.cookieService.get('sessionId')) {
      this.cookieService.set('sessionId', uuid.v4());
    }
    let payload = {
      text: "hello",
      by: 'user',
    }
    this.isOpen ? this.store.dispatch(new messagesAction.sendMessage(payload)) : ''
  }

  public sendMessage(message: string) {
    let payload = {
      text: this.message,
      by: 'user',
    }
    this.store.dispatch(new messagesAction.sendMessage(payload))
    this.message = ''
  }

  public popUpOpened() {
    if (!this.isOpened) {
      let payload = {
        event: "Welcome",
        by: 'user',
      }
      this.store.dispatch(new messagesAction.triggerEvent(payload))
      this.isOpened = true
    }
  }

  public chipsClicked(message) {
    this.messages$.subscribe(messages=>{
      messages[messages.length - 1].chips = []
    })
    let payload = {
      text: message,
      by: 'user',
    }
    this.store.dispatch(new messagesAction.sendMessage(payload))
  }

  // message: string;
  // messages: any = [];
  // isOpen: boolean = false;
  // _sessionId: string;
  // isOpened: boolean = false;
  // quickReplies: any;
  // constructor(private cookieService: CookieService,
  //   private http: HttpClient,
  //   private df: DfService,
  //   private store: Store<any>
  // ) {
  //   this.df.getToken()
  //   this._sessionId = cookieService.get("sessionId");
  // }
  // ngOnInit() {
  //   if (!this.cookieService.get('sessionId')) {
  //     this.cookieService.set('sessionId', uuid.v4());
  //   }
  // }
  // async sendMessage(e) {
  //   if (this.message) {
  //     let payload = {
  //       text: this.message,
  //       by: 'user',
  //     }
  //     this.messages.push(payload);
  //     const request = {
  //       queryInput: {
  //         text: {
  //           text: this.message,
  //           languageCode: 'en-US',
  //         },
  //       }
  //     };
  //     this.message = '';
  //     this.store.dispatch(new DF_call(request))
  //     this.df.df_client_call(request).subscribe(response => {
  //       this.quickReplies = []
  //       let text = response.queryResult.fulfillmentText || response.queryResult.fulfillmentMessages[0].payload.message.text
  //       console.log(response.queryResult.fulfillmentMessages);
  //       let payloadCheck = response.queryResult.fulfillmentMessages[0].hasOwnProperty('payload')
  //       this.messages.push({
  //         text: text,
  //         by: 'bot',
  //       })
  //       if (payloadCheck) {
  //         this.quickReplies = response.queryResult.fulfillmentMessages[0].payload.message.quick_replies
  //         this.messages.push({
  //           chips: this.quickReplies,
  //           by: 'bot',
  //         })
  //       }
  //     })
  //   }
  // }

  // popUpOpened() {
  //   if (!this.isOpened) {
  //     const request = {
  //       queryInput: {
  //         event: {
  //           name: 'Welcome',
  //           languageCode: 'en-US',
  //         },
  //       }
  //     };
  //     this.df.df_client_call(request).subscribe(response => {
  //       this.messages.push({
  //         text: response.queryResult.fulfillmentText,
  //         by: 'bot',
  //       })
  //       this.isOpened = true
  //     })
  //   }
  // }

  // chipsClicked(message) {
  //   this.messages[this.messages.length - 1].chips = []
  //   this.messages.push({
  //     text: message,
  //     by: 'user',
  //   })

  //   const request = {
  //     queryInput: {
  //       text: {
  //         text: message,
  //         languageCode: 'en-US',
  //       },
  //     }
  //   };
  //   this.df.df_client_call(request).subscribe(response => {
  //     this.messages.push({
  //       text: response.queryResult.fulfillmentText,
  //       by: 'bot',
  //     })
  //     this.isOpened = true
  //   })
  // }

}
