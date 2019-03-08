import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
declare const io: any;



@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private token: any;
  constructor() {
      this.token = 'Guest'
   }
  connect() {
    console.log('connected')
    return io(environment.apiUrl, {
      'query': {
        'token': this.token
      }
    });
  }
}
