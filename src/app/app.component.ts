import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Observable } from 'rxjs';
import { ClientService,Message } from './client.service';

import 'rxjs/add/operator/scan'

// import { scan } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger("openClose", [
      state(
        "open",
        style({
          opacity: 1
        })
      ),
      state(
        "closed",
        style({
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
    ]),

  ]
})
export class AppComponent implements OnInit {
  // isOpen: Boolean;
  // isShowTime: Boolean;
  // messages: Observable<Message[]>;

  // constructor(private chat: SocketService) { }
  // ngOnInit() {
  //   this.isOpen = false;
  //   this.isShowTime = false;
  //   this.messages = this.chat.messages.asObservable().scan((acc, val) => acc.concat(val));
  // }

  // sendMessage(e) {
  //   this.chat.sendMsg(e.target.value);
  //   (<HTMLInputElement>document.getElementById('_58al')).value = '';
  // }
  isOpen: Boolean;
  isShowTime: Boolean;
  messages: Observable<Message[]>;
  constructor(public clientService: ClientService) { }

  ngOnInit() {
    this.isOpen = true;
    this.isShowTime = false;
    this.messages = this.clientService.conversation.asObservable().scan((acc, val) => acc.concat(val));
  }

  sendMessage(e) {
    console.log((<HTMLInputElement>document.getElementById('_58al')).value);
    this.clientService.converse(e.target.value);
    (<HTMLInputElement>document.getElementById('_58al')).value = '';
 
  }
}
