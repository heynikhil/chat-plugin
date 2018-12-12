import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { BehaviorSubject } from "rxjs";
export class Message {
  constructor(public content: string, public sentBy: string) { }
}
@Injectable()
export class ClientService {

  conversation = new BehaviorSubject<Message[]>([]);

  constructor(private http: HttpClient) { }


  converse(msg: string) {
    const userMsg = new Message(msg, 'user');

    this.updateConversation(userMsg);
    this.http
      .post<any>(`http://localhost:4500/text_query`, msg)
      .pipe(
        map(response => {
          console.log("response");
          const speech = response.message;
          const adminMessage = new Message(speech, 'admin');
          this.updateConversation(adminMessage);
        })
      );
    const speech = "Hello";
      const adminMessage = new Message(speech, 'admin');
      this.updateConversation(adminMessage);
    


    //  this.http
    // .post<any>(`http://localhost:4500/text_query`, msg)
    // .pipe(
    //   map(response => {
    //     console.log("response");
    //     const speech = response.message;
    //     const adminMessage = new Message(speech, 'admin');
    //     this.updateConversation(adminMessage);
    //   })
    // );
  }
  updateConversation(msg: Message) {
    console.log(msg);
    this.conversation.next([msg]);
  }

}
