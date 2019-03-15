import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
declare const io: any;

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  connected$ = new BehaviorSubject<boolean>(false);
  private socket

  constructor() {
    this.socket = io(environment.socket.baseUrl, environment.socket.config)
    console.log(this.socket);

    this.socket.on('connect', () => this.connected$.next(true));
    this.socket.on('disconnect', () => this.connected$.next(false));
  }

  disconnect() {
    this.socket.disconnect();
    this.connected$.next(false);
  }
  emit(event: string, data?: any) {

    console.group();
    console.log('----- SOCKET OUTGOING -----');
    console.log('Action: ', event);
    console.log('Payload: ', data);
    console.groupEnd();

    this.socket.emit(event, data);
  }

  listen(event: string): Observable<any> {

    //     customer message
    // customer message
    // system error
    return new Observable(observer => {

      this.socket.on(event, data => {
        data = {
          text: data,
          by: 'bot'
        }
        console.group();
        console.log('----- SOCKET INBOUND -----');
        console.log('Action: ', event);
        console.log('Payload: ', data);
        console.groupEnd();

        observer.next([data]);
      });
      // dispose of the event listener when unsubscribed
      return () => this.socket.off(event);
    });
  }
}
