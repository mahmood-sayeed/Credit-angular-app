import { 
  Component, 
  OnInit,
  Input,
  EventEmitter,
  Output
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
  pageTitle = 'Add Credit Card Detail';
  @Input() errorMessage: string = '';
  @Input() successMessage: string = '';
  @Output() create = new EventEmitter<Card>();
  @Output() initializeNewCard = new EventEmitter<void>();
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

    //Initialize new card
    this.newCard();
  }

  // Also validate on blur
  // Helpful if the user tabs through required fields
  blur(): void {
    this.displayMessage = this.genericValidator.processMessages(this.cardForm);
  }

  addDays(currentDate: Date, days : number): Date{
    currentDate.setDate(currentDate.getDate() + days);
    return currentDate;
  }

  newCard(): void {
    this.initializeNewCard.emit();
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
