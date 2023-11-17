import passwordValidator from "password-validator";

// Create a schema
export const passwordSchema = new passwordValidator();

// Add properties to it
passwordSchema
  .is()
  .min(8, "Password should have a minimum length of 8 characters ") // Minimum length 8
  .is()
  .max(100) // Maximum length 100
  .has()
  .uppercase(1, "Password must have an uppercase letter.") // Must have uppercase letters
  .has()
  .lowercase(1, "Password must have a lowercase letter.") // Must have lowercase letters
  .has()
  .symbols(1, "Password must have a symbol.") // Must have at least 1 symbol
  .has()
  .digits(1, "Password must have a digit.") // Must have at least 1 digit
  .has()
  .not()
  .spaces(); // Should not have spaces
