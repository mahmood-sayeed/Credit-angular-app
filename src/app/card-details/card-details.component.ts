import { 
  Component, 
  OnInit,
  Input,
  EventEmitter,
  Output,
  OnChanges,
  SimpleChanges
 } from '@angular/core';
import { Card } from './card';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { GenericValidator } from '../shared/generic-validator';
import { DateValidators } from '../shared/date.validator';

@Component({
  selector: 'pm-card-edit',
  templateUrl: './card-details.component.html',
  styleUrls: ['./card-details.component.css']
})
export class CardDetailsComponent implements OnInit {
  pageTitle = 'Credit Card Detail';
  @Input() errorMessage: string = '';
  @Input() successMessage: string = '';
  @Output() create = new EventEmitter<Card>();
  @Output() clearCurrent = new EventEmitter<void>();

  cardForm: FormGroup;
  creditCard: Card;
  today = new Date();

  // Use with the generic validation message class
  displayMessage: { [key: string]: string } = {};
  private validationMessages: { [key: string]: { [key: string]: string } };
  private genericValidator: GenericValidator;

  constructor(private fb: FormBuilder) {
    // Defines all of the validation messages for the form.
    // These could instead be retrieved from a file or database.
    this.validationMessages = {
      cardNumber: {
        required: 'Card number is required.'
      },
      cardHolder: {
        required: 'Card holder name is required.'
      },
      expirationDate: {
        required: 'Expiration Date is required',
        minimumDate: "Expiration Date must be greater than Current Date"
      },
      securityCode: {
        maxlength: 'Security code cannot be more than 3 digits'
      },
      amount: {
        required: 'Amount is required',
        min: 'Amount must be greater than 0'
      }
    };

    // Define an instance of the validator for use with this form,
    // passing in this form's set of validation messages.
    this.genericValidator = new GenericValidator(this.validationMessages);
  }

  

  ngOnInit(): void {
   

    // Define the form group
    this.cardForm = this.fb.group({
      cardNumber: ['', Validators.required],
      cardHolder: ['', Validators.required],
      expirationDate: ['', [Validators.required, DateValidators.minimumDate(this.addDays(this.today,1))]],
      securityCode: ['', Validators.maxLength(3)],
      amount: ['',[Validators.required, Validators.min(1)]],
    });

    // Watch for value changes for validation
    this.cardForm.valueChanges.subscribe(
      () => this.displayMessage = this.genericValidator.processMessages(this.cardForm)
    );
  }

  // ngOnChanges(changes: SimpleChanges): void {
  //   // patch form with value from the store
  //   if (changes.selectedCard) {
  //     const card = changes.selectedCard.currentValue as Card;
  //     this.displayCard(card);
  //   }
  // }

  // Also validate on blur
  // Helpful if the user tabs through required fields
  blur(): void {
    this.displayMessage = this.genericValidator.processMessages(this.cardForm);
  }

  // displayCard(card: Card | null): void {
  //   if (card && this.cardForm) {
  //     // Reset the form back to pristine
  //     this.cardForm.reset();

  //     // Display the appropriate page title
  //     if (card.id === 0) {
  //       this.pageTitle = 'Add Card';
  //     } else {
  //       this.pageTitle = `Edit Card: ${card.productName}`;
  //     }

  //     // Update the data on the form
  //     this.cardForm.patchValue({
  //       cardNumber: card.cardNumber,
  //       cardHolder: card.cardHolder,
  //       expirationDate: card.expirationDate,
  //       securityCode: card.securityCode,
  //       amount: card.amount
  //     });
  //   }
  // }

  addDays(currentDate: Date, days : number): Date{
    currentDate.setDate(currentDate.getDate() + days);
    return currentDate;
  }

  saveCard(): void {
    if (this.cardForm.valid) {
      if (this.cardForm.dirty) {
        const card = { ...this.creditCard, ...this.cardForm.value };

        this.create.emit(card);
      }
    }
  }

}
