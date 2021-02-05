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


  // concatMap((action) =>
  //     of(action).pipe(withLatestFrom(this.store.select(selectProducts))),
  //   ),
  //   filter(([{ payload }, products]) => !!products[payload.sku]),

  // updateCard$ = createEffect(() => {
  //   return this.actions$
  //     .pipe(
  //       ofType(CardPageActions.updateCard),
  //       concatMap(action =>
  //         this.cardService.updateCard(action.card)
  //           .pipe(
  //             map(card => CardApiActions.updateCardSuccess({ card })),
  //             catchError(error => of(CardApiActions.updateCardFailure({ error })))
  //           )
  //       )
  //     );
  // });

  createCard$ = createEffect(() => {
    return this.actions$
      .pipe(
        ofType(CardPageActions.createCard),
        concatMap(action =>
          this.cardService.createCard(action.card)
            .pipe(
              map(card => CardApiActions.createCardSuccess({ card })),
              catchError(error => of(CardApiActions.createCardFailure({ error })))
            )
        )
      );
  });
}
