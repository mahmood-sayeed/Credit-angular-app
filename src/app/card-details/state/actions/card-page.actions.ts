import { Card } from '../../card';

/* NgRx */
import { createAction, props } from '@ngrx/store';

export const initializeCurrentCard = createAction(
  '[Card Page] Initialize Current Card'
);

export const loadCard = createAction(
  '[Card Page] Load'
);

export const createCard = createAction(
  '[Card Page] Create Card',
  props<{ card: Card }>()
);

