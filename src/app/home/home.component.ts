import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';


/* NgRx */
import { Store } from '@ngrx/store';

import { Card } from '../card-details/card';
import { getCard, getError, State } from '../card-details/state';
import { CardPageActions } from '../card-details/state/actions';

@Component({
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  card$: Observable<Card>;
  errorMessage$: Observable<string>;


  

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

}
