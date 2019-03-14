import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { EMPTY, of } from 'rxjs';
import { map, mergeMap, catchError, tap } from 'rxjs/operators';
import { DfService } from '../df.service';
import { receivedTextMessage, MessageActionTypes } from '../actions/message.actions';


//     const request = {
//       queryInput: {
//         event: {
//           name: 'Welcome',
//           languageCode: 'en-US',
//         },
//       }
//     };
@Injectable()
export class MessageEffect {

    @Effect()
    messages$ = this.actions$.pipe(
        ofType(MessageActionTypes.SEND_MESSAGE),
        mergeMap((action: any) => this._df.df_client_call(
            {
                queryInput: {
                    text: {
                        text: action.payload.text,
                        languageCode: 'en-US',
                    },
                }
            }
        )),
        map((response: any) => {
            let data: any = {
                text: response.queryResult.fulfillmentText ||  response.queryResult.fulfillmentMessages[0].payload.message.text,
                by: 'bot'
            }
            let payloadCheck = response.queryResult.fulfillmentMessages[0].hasOwnProperty('payload')
            let chipsCheck = payloadCheck && response.queryResult.fulfillmentMessages[0].payload.message.quick_replies ? true : false
            if (chipsCheck) data.chips = response.queryResult.fulfillmentMessages[0].payload.message.quick_replies

            return (new receivedTextMessage(data))
        }),
        catchError(() => EMPTY)
    )

    @Effect()
    events$ = this.actions$.pipe(
        ofType(MessageActionTypes.TRIGGER_EVENT),
        mergeMap((action: any) => this._df.df_client_call(
            {
                queryInput: {
                    event: {
                        name: action.payload.event,
                        languageCode: 'en-US',
                    },
                }
            }
        )),
        map((response: any) => {
            let data: any = {
                text: response.queryResult.fulfillmentText ||  response.queryResult.fulfillmentMessages[0].payload.messagetext,
                by: 'bot'
            }
            let payloadCheck = response.queryResult.fulfillmentMessages[0].hasOwnProperty('payload')
            let chipsCheck = payloadCheck && response.queryResult.fulfillmentMessages[0].payload.message.quick_replies ? true : false
            if (chipsCheck) data.chips = response.queryResult.fulfillmentMessages[0].payload.message.quick_replies

            return (new receivedTextMessage(data))
        }),
        catchError(() => EMPTY)
    )

    constructor(
        private actions$: Actions,
        private _df: DfService
    ) { }

}