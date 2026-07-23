export function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function isValidPhone(phone) {
  return /^0\d{2,4}-?\d{6,8}$/.test(phone.trim());
}

export function isValidAge(age) {
  const numericAge = Number(age);
  return Boolean(age) && numericAge >= 12 && numericAge <= 80;
}

export function validateMemberForm(form) {
  const errors = {};

  if (form.fullName.trim().length < 3) {
    errors.fullName = "Enter the member's full name (at least 3 characters).";
  }

  if (!isValidEmail(form.email)) {
    errors.email = "Enter a valid email address.";
  }

  if (!isValidPhone(form.phone)) {
    errors.phone = "Enter a valid phone number, e.g. 0300-1234567.";
  }

  if (!isValidAge(form.age)) {
    errors.age = "Age must be between 12 and 80.";
  }

  if (!form.gender) {
    errors.gender = "Select a gender.";
  }

  if (!form.planId) {
    errors.planId = "Select a membership plan.";
  }

  if (!form.startDate) {
    errors.startDate = "Select a start date.";
  }

  return errors;
}