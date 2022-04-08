export const EMAIL = "email",
  PHONE = "phone",
  FULLNAME = "full_name",
  ADDRESS = "address",
  CITY = "city",
  COUNTRY = "country",
  POSTALCODE = "postal_code",
  SUBMIT = "submit";

export const EMAIL_ERR = "email_error",
  PHONE_ERR = "phone_error",
  FULLNAME_ERR = "fullname_error",
  ADDRESS_ERR = "address_error",
  CITY_ERR = "city_error",
  COUNTRY_ERR = "country_error",
  POSTAL_ERR = "postal_error";

export const fieldToErrMappings = {
  [EMAIL]: EMAIL_ERR,
  [PHONE]: PHONE_ERR,
  [FULLNAME]: FULLNAME_ERR,
  [ADDRESS]: ADDRESS_ERR,
  [CITY]: CITY_ERR,
  [COUNTRY]: COUNTRY_ERR,
  [POSTALCODE]: POSTAL_ERR,
};

export const EMPTY_FIELD_MSG = "Field cannot be empty",
  INVALID_PHONE_NUM = "Invalid phone number",
  INVALID_EMAIL = "Invalid email",
  INVALID_FULLNAME = "Invalid fullname",
  INVALID_ADDRESS = "Invalid address",
  SUCCEED_MSG = "";
