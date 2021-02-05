import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { Card } from '../card';

@Component({
  selector: 'pm-card-view',
  templateUrl: './card-view.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardViewComponent {
  pageTitle = 'Display Card';

  @Input() errorMessage: string;
  @Input() card: Card;
  @Output() initializeNewCard = new EventEmitter<void>();

  
  newCard(): void {
    this.initializeNewCard.emit();
  }
}
