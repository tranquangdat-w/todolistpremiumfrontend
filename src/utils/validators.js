/* eslint-disable no-useless-escape */
export const FIELDS_REQUIRED_MESSAGE = 'This field is required'
export const EMAIL_RULE = /^\S+@\S+.\S+$/
export const EMAIL_RULE_MESSAGE = 'Email is invalid'
export const PASSWORD_RULE = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/
export const PASSWORD_RULE_MESSAGE = 'Password must have at least 8 characters including letters and numbers, special symbols'
export const REPASSWORD_RULE_MESSAGE = 'Password is not match'
