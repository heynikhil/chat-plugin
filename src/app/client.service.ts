// import { Injectable } from '@angular/core';
// import { Observable } from 'rxjs/Observable';
// import * as Rx from 'rxjs/Rx';
// import { environment } from '../environments/environment';
// import { BehaviorSubject } from 'rxjs/Rx';

// declare const io:any
// export class Message {
//   constructor(public msg: string) { }
// }
// @Injectable()
// export class WebsocketService {

//   private socket;
//   conversation = new BehaviorSubject<Message[]>([]);

//   constructor() { }

//   connect(): Rx.Subject<MessageEvent> {
//     this.socket = io('http://localhost:4555');
//     let observable = new Observable(observer => {
//         this.socket.on('message', (data) => {
//           console.log("2");

//           observer.next(data);
//         })
//         return () => {
//           this.socket.disconnect();
//         }
//     });

//     let observer = {
//         next: (data: Object) => {
//           console.log("1",data);
//           this.socket.emit('message', JSON.stringify(data));
//         },
//     };
//     return Rx.Subject.create(observer, observable);
//   }

// }
import { Injectable } from "@angular/core";
import * as Rx from 'rxjs/Rx';
import { BehaviorSubject, Observable } from "rxjs";
declare const io: any

export class Message {
  constructor(public msg: string, public sentBy: string) { }
}
@Injectable()
export class ClientService {
  private socket;
  conversation = new BehaviorSubject<Message[]>([]);

  constructor() { }

  converse(msg: string) {
    console.log(1,msg);
    const userMsg = new Message(msg, 'user');
    this.updateConversation(userMsg);
    this.connect(userMsg)
   
  }
  updateConversation(msg: Message) {
    this.conversation.next([msg]);
  }

  connect(userMsg): Rx.Subject<MessageEvent> {
    console.log("Connect",userMsg);
    
    this.socket = io('http://localhost:4555');
    let observable = new Observable(observer => {
      this.socket.on('message', (data) => {
        
        const adminMessage = new Message(data, 'admin');
        this.updateConversation(adminMessage);
        observer.next(data);
      })
      return () => {
        this.socket.disconnect();
      }
    });

    let observer = {
      next: (data: Object) => {
        console.log("1",data);
        this.socket.emit('message', JSON.stringify(data));
      },
    };
    return Rx.Subject.create(observer, observable);
  }
}