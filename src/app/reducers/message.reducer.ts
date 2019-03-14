import { Action } from "@ngrx/store";
import { Message } from '../models/message.model'
import * as Msg from "../actions/message.actions"

const initialState = []

export function reducer(state: Message[] = [], action: Msg.Actions) {

    switch (action.type) {
        case Msg.MessageActionTypes.SEND_MESSAGE:
        case Msg.MessageActionTypes.RECEIVED_MESSAGE:
        case Msg.MessageActionTypes.TRIGGER_EVENT:

            return [...state, action.payload]



        default:
            return [...state]
    }

}

