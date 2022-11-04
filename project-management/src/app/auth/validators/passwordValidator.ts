import { AbstractControl, ValidationErrors } from '@angular/forms';

const passwordValidator = ({ value }: AbstractControl<string, string>): ValidationErrors | null => {
  const regexArr = [/[A-Z]+/g, /[a-z]+/g, /[0-9]+/g, /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+/];
  const validTests = regexArr.map((regex) => regex.test(value));
  validTests.push(value.length > 7);

  const isValid = validTests.every((res) => res === true);

  return isValid || value.length === 0 ? null : { inValidPass: 'password invalid' };
};

export default passwordValidator;
