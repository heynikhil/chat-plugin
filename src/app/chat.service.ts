import { Observable } from 'rxjs/Observable';
import { map } from "rxjs/operators";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

export class Message {
    constructor(public text: any, public sentBy: any) { }
}

// declare const io: any;

@Injectable({
    providedIn: 'root',
})
export class ChatService {
    // private url = 'http://localhost:4555';
    // private socket:any;

    constructor(public http: HttpClient) {
        // this.socket = io(this.url);
    }

    public sendMessage(message) {
        const usertext = new Message(message, 'user');
        console.log("message send",usertext);
        return this.http
            .post<any>("http://localhost:5000/api/df_text_query", usertext)

        // this.socket.emit('new-message', usertext);
    }

    // public getMessages = () => {
    //     return Observable.create((observer) => {
    //         this.socket.on('new-message', (message) => {
    //             observer.next(message);
    //         });
    //     });
    // }
}