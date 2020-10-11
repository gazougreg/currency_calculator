import { extend } from 'vee-validate';
import { required, alpha_spaces } from 'vee-validate/dist/rules';

//validation checks

// Override the default message.

extend('required', {
    ...required,
    message: 'This field is required',
});

extend('required_selection', {
    validate: value => Object.keys(value).length > 0,
    message: 'Please choose one option',
});

extend('alpha_spaces', {
    ...alpha_spaces,
    message: 'The field may only contain alphabetic characters as well as spaces',
});

extend('exchange_rate_regex', {
    validate: value => /^(([1-9]\d*)(\.\d{1,6})?|0(\.\d{1,6}))$/.test(value),
    message: 'The filed may only contain floating number with maximum 6 decimals',
});
