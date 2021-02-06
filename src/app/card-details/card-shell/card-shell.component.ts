import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { Card } from '../card';

/* NgRx */
import { Store } from '@ngrx/store';
import { State, getCard, getError, getSuccess } from '../state';

import { CardPageActions } from '../state/actions';

@Component({
  templateUrl: './card-shell.component.html'
})
export class CardShellComponent implements OnInit {
  card$: Observable<Card>;
  errorMessage$: Observable<string>;
  successMessage$: Observable<string>;

  constructor(private store: Store<State>) { }

  ngOnInit(): void {

    // Do NOT subscribe here because it uses an async pipe
    // This gets the initial values until the load is complete.
    this.card$ = this.store.select(getCard);

    // Do NOT subscribe here because it uses an async pipe
    this.errorMessage$ = this.store.select(getError);

  }

  newCard(): void {
    this.store.dispatch(CardPageActions.initializeCurrentCard());
  }

  saveCard(card: Card): void {
    this.store.dispatch(CardPageActions.createCard({ card }));
    
    // Do NOT subscribe here because it uses an async pipe
    this.successMessage$ = this.store.select(getSuccess);
    console.log(card);
  }
}
