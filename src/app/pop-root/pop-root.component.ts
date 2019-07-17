import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import * as messagesAction from '../actions/message.actions';

import { Store } from '@ngrx/store';
import { trigger, style, state, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-pop-root',
  templateUrl: './pop-root.component.html',
  styleUrls: ['./pop-root.component.css'],
  animations: [
    trigger("openClose", [
      state("open", style({
        opacity: 1
      })
      ),
      state("closed", style({
        opacity: 0
      })
      ),
      transition("open => closed", [
        style({ "transform-origin": "right bottom 0", }),
        animate("500ms cubic-bezier(0,0.1,0.5,1)")]),

      transition("closed => open", [
        style({ transform: "scale(-0.1,-0.5)" }),
        style({ transform: "scale(0)", "transform-origin": "right bottom 0", }),
        animate("1000ms cubic-bezier(0.5,0.1,0.5,1)")
      ])
    ])

  ]
})
export class PopRootComponent implements OnInit {
  public isOpen: boolean = false
  public isOpened: boolean = false

  @ViewChild('scrollMe') scrollDiv: ElementRef;
  constructor(private store: Store<any>) { }

  ngOnInit() {
  }

  public popUpOpened() {
    console.log('clicked');

    if (!this.isOpened) {
      console.log("here");

      this.scrollToBottom();
      let payload = {
        event: "Welcome",
        by: 'user',
      }
      this.store.dispatch(new messagesAction.triggerEvent(payload))
      this.isOpened = true
    }
  }
  scrollToBottom(): void {
    try {
      this.scrollDiv.nativeElement.scrollTop = this.scrollDiv.nativeElement.scrollHeight;
    } catch (err) { }
  }
}
