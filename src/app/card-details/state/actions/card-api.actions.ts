
/* NgRx */
import { createAction, props } from '@ngrx/store';
import { Card } from '../../card';

export const loadCardSuccess = createAction(
  '[Card API] Load Success',
  props<{ card: Card }>()
);

export const loadCardFailure = createAction(
  '[Card API] Load Fail',
  props<{ error: string }>()
);

export const createCardSuccess = createAction(
  '[Card API] Create Card Success',
  props<{ card: Card; success: string }>()
);

export const createCardFailure = createAction(
  '[Card API] Create Card Fail',
  props<{ error: string }>()
);
