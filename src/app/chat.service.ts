import { Observable } from 'rxjs/Observable';
export class Message {
  constructor(public msg: any, public sentBy: any) { }
}

declare const io:any;
export class ChatService {
    private url = 'http://localhost:4555';
    private socket:any;

    constructor() {
        this.socket = io(this.url);
    }

    public sendMessage(message) {
        const userMsg = new Message(message, 'user');
        this.socket.emit('new-message', userMsg);
    }

    public getMessages = () => {
        return Observable.create((observer) => {
            this.socket.on('new-message', (message) => {
                observer.next(message);
            });
        });
    }
}