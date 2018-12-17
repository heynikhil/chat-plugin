import {Component, OnInit} from '@angular/core';
import {ChatService,Message} from './chat.service';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/skipWhile';
import 'rxjs/add/operator/scan';
import 'rxjs/add/operator/throttleTime';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  message: string;
  messages: string[] = [];
  isOpen:true
  constructor(private chatService: ChatService) {
  }

  sendMessage(e) {
    const userMessages:any = new Message(this.message, 'user');
    this.messages.push(userMessages);
    this.chatService.sendMessage(this.message);
    this.message = '';
  }

  ngOnInit() {
    this.chatService
      .getMessages()
      .subscribe((message: string) => {
        let d = new Date()
        const currentTime:any = d.getTime();
        const adminMessage:any = new Message(message, 'admin');

        // const messageWithTimestamp = `${currentTime}: ${message}`;
        this.messages.push(adminMessage);
        console.log(this.messages)
      });
  }
}