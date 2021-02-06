import { Injectable } from '@angular/core';

import { mergeMap, map, catchError, concatMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { CardService } from '../card.service';

/* NgRx */
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { CardPageActions, CardApiActions } from './actions';

@Injectable()
export class CardEffects {

  constructor(private actions$: Actions, private cardService: CardService) { }

  loadCards$ = createEffect(() => {
    return this.actions$
      .pipe(
        ofType(CardPageActions.loadCard),
        mergeMap(() => this.cardService.getCard()
          .pipe(
            map(card => CardApiActions.loadCardSuccess({ card })),
            catchError(error => of(CardApiActions.loadCardFailure({ error })))
          )
        )
      );
  });


  createCard$ = createEffect(() => {
    return this.actions$
      .pipe(
        ofType(CardPageActions.createCard),
        concatMap(action =>
          this.cardService.createCard(action.card)
            .pipe(
              map(card => CardApiActions.createCardSuccess({ card: card, success: 'Credit Card Details Saved Successfully!!' })),
              catchError(error => of(CardApiActions.createCardFailure({ error })))
            )
        )
      );
  });
}
