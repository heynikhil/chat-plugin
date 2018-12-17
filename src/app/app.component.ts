import { Component, OnInit } from '@angular/core';
import { ChatService, Message } from './chat.service';
import { trigger, state, style, transition, animate } from '@angular/animations';


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
  message: string;
  messages: string[] = [];
  isOpen: true
  constructor(private chatService: ChatService) {
  }

  sendMessage(e) {
    const userMessages: any = new Message(this.message, 'user');
    this.messages.push(userMessages);
    this.chatService.sendMessage(this.message).subscribe(res => {
      const adminMessage: any = new Message(res.fulfillmentText, 'admin');
      this.messages.push(adminMessage);
    }, err => {
      console.log(err);

    })
    this.message = '';
  }

  ngOnInit() {
    // this.chatService
    //   .getMessages()
    //   .subscribe((message: string) => {
    //     const adminMessage:any = new Message(message, 'admin');
    //     this.messages.push(adminMessage);
    //     console.log(this.messages)
    //   });
  }
}