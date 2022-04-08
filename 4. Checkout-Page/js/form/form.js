import { notify } from "./notifier.js";
import * as c from "./const.js"

const email     = document.getElementById(c.EMAIL),
      phone     = document.getElementById(c.PHONE),
      fullName  = document.getElementById(c.FULLNAME),
      address   = document.getElementById(c.ADDRESS),
      city      = document.getElementById(c.CITY),
      country   = document.getElementById(c.COUNTRY),
      postalCode = document.getElementById(c.POSTALCODE);

const validationRules = {
  [c.EMAIL]:    { rule: validateEmail, optional: false },
  [c.PHONE]:    { rule: validatePhone, optional: false },
  [c.FULLNAME]: { rule: validateFullName, optional: false },
  [c.ADDRESS]:  { rule: noValidation, optional: true },
  [c.CITY]:     { rule: noValidation, optional: true },
  [c.COUNTRY]:  { rule: noValidation, optional: true },
  [c.POSTALCODE]: { rule: noValidation, optional: true },
};

const submitButton = document.getElementById(c.SUBMIT);
submitButton.addEventListener("click", submit);

function submit() {
    let formData = getFormData();
    let errFields = validateForm(formData);

    notify(errFields)
}

function getFormData() {
    return {
        [c.EMAIL]: email.value,
        [c.PHONE]: phone.value,
        [c.FULLNAME]: fullName.value,
        [c.ADDRESS]: address.value,
        [c.CITY]: city.value,
        [c.COUNTRY]: country.value,
        [c.POSTALCODE]: postalCode.value
    }
}

function validateForm(formData) {
    let errFields = [];
    
    for (const [field, fieldVal] of Object.entries(formData)) {
        if (!(field in validationRules)) {
            continue
        }
    
        let { rule, optional } = validationRules[field];

        let [passed, errMsg] = validateOptional(fieldVal, optional);
        if (!passed) {
            errFields.push({field, errMsg})
            continue
        }
        
        [passed, errMsg] = rule(fieldVal);
        if (!passed) {
            errFields.push({field, errMsg})
        }
    }
    
    return errFields
}

function validateOptional(value, isOptional) {
    if (!isOptional && value == "") {
        return [false, c.EMPTY_FIELD_MSG]
    }

    return [true, c.SUCCEED_MSG];
}

function validateEmail(val) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    if (!re.test(val)) {
        return [false, c.INVALID_EMAIL]
    }

    return [true, c.SUCCEED_MSG]
}

function validatePhone(val) {
    var re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
    if (!re.test(val)) {
        return [false, c.INVALID_PHONE_NUM]
    }

    return [true, c.SUCCEED_MSG]
}

function validateFullName(val) {
    var re = /^[a-zA-Z ]+$/; 
    if (!re.test(val)) {
        return [false, c.INVALID_FULLNAME]
    }

    return [true, c.SUCCEED_MSG];
}

function noValidation(val) {
    return [true, c.SUCCEED_MSG];
}