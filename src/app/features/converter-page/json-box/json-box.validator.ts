import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";


/**
 * As like it mentioned in the task to use Angular reactive form 
 * Validators to validate the json
 * I created a custom  validator which attempt to parse the input as JSON 
 * and return an error object if parsing fails
 * 
 * @note I thought to provide more imperative validation rules but preferred to keep it simple and clean.
 * 
 * @returns {Function: ValidatorFn}
 */
export function jsonBoxValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        try {
            return JSON.parse(control.value) && null;
        } catch (error) {
            return {
                invalidJson: true
            }
        }
    }
}