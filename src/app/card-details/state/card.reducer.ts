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

  // on(CardPageActions.setCurrentCard, (state, action): CardState => {
  //   return {
  //     ...state,
  //     currentCardId: action.currentCardId
  //   };
  // }),
  // on(CardPageActions.clearCurrentCard, (state): CardState => {
  //   return {
  //     ...state,
  //     currentCardId: null
  //   };
  // }),
  on(CardPageActions.initializeCurrentCard, (state): CardState => {
    return {
      ...state
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
  // on(CardApiActions.updateCardSuccess, (state, action): CardState => {
  //   const updatedCards = state.cards.map(
  //     item => action.card.id === item.id ? action.card : item);
  //   return {
  //     ...state,
  //     cards: updatedCards,
  //     currentCardId: action.card.id,
  //     error: ''
  //   };
  // }),
  // on(CardApiActions.updateCardFailure, (state, action): CardState => {
  //   return {
  //     ...state,
  //     error: action.error
  //   };
  // }),
  // After a create, the currentCard is the new card.
  on(CardApiActions.createCardSuccess, (state, action): CardState => {
    return {
      ...state,
      card: action.card,
      error: '',
      success: ''
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
