import { Injectable } from '@angular/core';
import { ClientService } from './client.service';
import { Observable, Subject } from 'rxjs/Rx';
export class Message {
  constructor(public msg: string, public sentBy: string) { }
}
@Injectable({
  providedIn: 'root'
})
export class SocketService {
  constructor(private wsService: ClientService) {
    this.messages = <Subject<any>>wsService
      .connect(this.messages)
      .map((response: any): any => {
        return response;
      })
  }
  messages: Subject<any>;
  sendMsg(msg) {
    const userMsg = new Message(msg, 'user');
    this.messages.next(userMsg);
  }
}
