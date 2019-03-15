import { Component, ViewChild, ElementRef } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { HttpClient } from '@angular/common/http';
import { CookieService } from './cookie.service';
import * as uuid from 'uuid';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from './app.state'
import { Message } from './models/message.model'
import * as messagesAction from './actions/message.actions';
declare const M: any;
declare const options: any;


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
  public scrolltop: number = null;
  @ViewChild('scrollMe') scrollDiv: ElementRef;

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
    this.scrollToBottom();
    let payload = {
      text: this.message,
      by: 'user',
    }
    this.store.dispatch(new messagesAction.sendMessage(payload))
    this.message = ''
  }

  public popUpOpened() {
    if (!this.isOpened) {
      this.scrollToBottom();
      let payload = {
        event: "Welcome",
        by: 'user',
      }
      this.store.dispatch(new messagesAction.triggerEvent(payload))
      this.isOpened = true
    }
  }

  public chipsClicked(message) {
    console.log("messages", message);
    this.scrollToBottom();
    this.messages$.subscribe(messages => {
      messages[messages.length - 1].chips = []
    }).unsubscribe()
    let payload = {
      text: message,
      by: 'user',
    }
    this.store.dispatch(new messagesAction.sendMessage(payload))
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  scrollToBottom(): void {
    try {
      this.scrollDiv.nativeElement.scrollTop = this.scrollDiv.nativeElement.scrollHeight;
    } catch (err) { }
  }
}
