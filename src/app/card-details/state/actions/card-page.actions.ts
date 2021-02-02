import { Card } from '../../card';

/* NgRx */
import { createAction, props } from '@ngrx/store';


// export const setCurrentCard = createAction(
//   '[Card Page] Set Current Card',
//   props<{ currentCardId: number }>()
// );

export const initializeCurrentCard = createAction(
  '[Card Page] Initialize Current Card'
);

export const loadCard = createAction(
  '[Card Page] Load'
);

// export const updateCard = createAction(
//   '[Card Page] Update Card',
//   props<{ card: Card }>()
// );

export const createCard = createAction(
  '[Card Page] Create Card',
  props<{ card: Card }>()
);

