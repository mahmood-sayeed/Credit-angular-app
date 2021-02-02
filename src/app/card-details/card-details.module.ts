import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SharedModule } from '../shared/shared.module';

import { CardShellComponent } from './card-shell/card-shell.component';
import { CardDetailsComponent } from './card-details.component';

/* NgRx */
import { StoreModule } from '@ngrx/store';
import { cardReducer } from './state/card.reducer';
import { EffectsModule } from '@ngrx/effects';
import { CardEffects } from './state/card.effects';


const cardRoutes: Routes = [
  { path: '', component: CardShellComponent }
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(cardRoutes),
    StoreModule.forFeature('card', cardReducer),
    EffectsModule.forFeature([CardEffects])
  ],
  declarations: [
    CardShellComponent,
    CardDetailsComponent
  ]
})
export class CardDetailsModule { }
