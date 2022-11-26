import { AbstractControl, ValidationErrors } from '@angular/forms';

const noSpaceValidator = ({ value }: AbstractControl<string, string>): ValidationErrors | null => {
  const isSpace = value.indexOf(' ') >= 0;
  const isValid = !isSpace;

  return isValid ? null : { whitespace: true };
};

export default noSpaceValidator;
