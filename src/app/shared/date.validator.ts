import { AbstractControl, ValidatorFn } from '@angular/forms';

export class DateValidators {

    static minimumDate(minDate: Date): ValidatorFn {
        return (c: AbstractControl): { [key: string]: boolean } | null => {
            if (c.value && c.value >= minDate ) {
                return { range: true };
            }
            return null;
        };
    }
}
