import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as AppState from '../../state/app.state';
import { CardState } from './card.reducer';

// // Extends the app state to include the card feature.
// // This is required because cards are lazy loaded.
// // So the reference to CardState cannot be added to app.state.ts directly.
export interface State extends AppState.State { }

// Selector functions
const getCardFeatureState = createFeatureSelector<CardState>('card');

export const getCard = createSelector(
    getCardFeatureState,
    state => state.card
);

export const getError = createSelector(
    getCardFeatureState,
    state => state.error
);

export const getSuccess = createSelector(
    getCardFeatureState,
    state => state.success
);