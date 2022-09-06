export class User {
  userId: number;
  username: string;
  emailId: string;
  mobileNo: number;
  companyName?: string;
  userTypeId: number;
  planId: number;
  otp: string;
  password: string;
  firstName: string;
  lastName: string;
  status: boolean;
  token: string;
  authdata?: string;
}
// Allows only Specific special characters and alpha numeric values
export const SPECIAL_CHARACTERS_REGEX = /^[A-Za-z0-9 ,./-]+$/;
// Allows only Specific special characters and alpha numeric values
export const ALLOW_NUMBERS_ONLY = /^[0-9]*$/;
// Mobile Number REGEX
export const MOBILE_NUMBER_REGEX = '^([0|+[0-9]{1,4})?([6-9][0-9]{9})$';
// Email Regex
export const EMAIL_REGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,10})+$/;
// Alphabets Only
export const ALLOW_ALPHABETS_ONLY = /^[a-zA-Z ]+$/;

export const ALLOW_NUMBERS_DECIMAL_ONLY = /^\d*\.?\d*$/;
// PASSWORD VALIDATION
export const PASSWORD_VALIDATION =
  /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
// Website URL Validation
export const WEBSITE_URL_VALIDATION =
  /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/;

export const SIGNUP_PAGE_META_CONTENT = `Get register your self at bigship registration page for free with you name, mobile number, email, password to eassy access your shipping Account. Signup with Bigship.`;

export const HEAVY_SHIPMENT_PAGE_META_CONTENT = `Bigship is now making it seamless to deliver B2B or any heavy shipments Less than truck load and Full truck load (FTL & LTL) anywhere in India at cost-effective prices.`;

export const TRACKING_PAGE_META_CONTENT = `Track the current status of your shipment order/consignment with Bigship order tracking. Get real-time tracking information of your shipment. Just enter your AWB No. or Order ID in the online tool.`;

export const INTERNATIONAL_PAGE_META_CONTENT = `As an international shipping aggregator Bigship provides best international shipping service in India to its client. Contact Now and start international courier service.`;
