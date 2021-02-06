import { AbstractControl, ValidatorFn } from '@angular/forms';

export class DateValidators {

    static minimumDate(minDate: string): ValidatorFn {
        return (c: AbstractControl): { [key: string]: boolean } | null => {
            if (c.value && c.value < minDate ) {
                return { minimumDate: true };
            }
            return null;
        };
    }
}
