import { Card } from '../card';

/* NgRx */
import { createReducer, on } from '@ngrx/store';
import { CardApiActions, CardPageActions } from './actions';

// State for this feature (Card)
export interface CardState {
  card: Card;
  error: string;
  success: string;
}

const initialState: CardState = {
  card: {} as Card,
  error: '',
  success: ''
};

export const cardReducer = createReducer<CardState>(
  initialState,

  on(CardPageActions.initializeCurrentCard, (state): CardState => {
    return {
      ...state,
      error: '',
      success: ''
    };
  }),
  on(CardApiActions.loadCardSuccess, (state, action): CardState => {
    return {
      ...state,
      card: action.card,
      error: '',
      success: ''
    };
  }),
  on(CardApiActions.loadCardFailure, (state, action): CardState => {
    return {
      ...state,
      card: {} as Card,
      error: action.error,
      success: ''
    };
  }),
  on(CardApiActions.createCardSuccess, (state, action): CardState => {
    return {
      ...state,
      card: action.card,
      error: '',
      success: action.success
    };
  }),
  on(CardApiActions.createCardFailure, (state, action): CardState => {
    return {
      ...state,
      error: action.error,
      success: ''
    };
  })
);
