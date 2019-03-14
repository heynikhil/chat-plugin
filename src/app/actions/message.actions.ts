import { Action } from "@ngrx/store";
import { Injectable } from '@angular/core';
import { Message } from '../models/message.model'

export enum MessageActionTypes {
    SEND_MESSAGE = '[Message] Add',
    TRIGGER_EVENT = '[Message] Event',
    RECEIVED_MESSAGE = '[Message] received success',
}


export class sendMessage implements Action {
    readonly type = MessageActionTypes.SEND_MESSAGE
    constructor(public payload: Message) { }
}

export class triggerEvent implements Action {
    readonly type = MessageActionTypes.TRIGGER_EVENT
    constructor(public payload: Message) { }
}

export class receivedTextMessage implements Action {
    readonly type = MessageActionTypes.RECEIVED_MESSAGE
    constructor(public payload: Message) { }
}

export type Actions = sendMessage | receivedTextMessage | triggerEvent