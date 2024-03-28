export class Detail {
  company_code: string;
  constructor() {
    this.company_code = 'AV';
  }
}

export class Authorize {
  company_code: string;
  authorized_by: string;
  applicant_id: any;
  constructor() {
    this.company_code = '';
    this.authorized_by = '';
    this.applicant_id = [];
  }
}

export interface AuthorisationFormModel {
  company_code: string;
  approval_status: string;
  applicant_id: string;
  loan_amount:string;
  applicant_company_code:string
  approval_by:string
  comment:string
  eligible_loan_amount:string
}

export interface AddUserModel{
  
    user_id: string|null
    firstname: string;
    lastname: string
    email_id: string
    mobile_no: string
    password: string
    company_code:string|null;
    role: string,
    admin: boolean,
    bc_agent: boolean,
    companyName: string,
    otp: string|null
}

export interface ModifyUserModel{
  
  user_id: string|null
  firstname: string;
  lastname: string
  email_id: string
  mobile_no: string
  password: string
  company_code:string;
  role: string,
  admin: boolean,
  bc_agent: boolean,
  companyName: string,
  otp: string
}

export interface UserDetail{
  user_id:string|null
}

export interface ResetPass{
  user_id:string|null
  old_password:string
  new_password:string
  mobile_no:string|null
}

export interface ForgetPass{
  otp:string|null
  new_password:string|null
  mobile_no:string|null
}

export interface AddCompanyModel{
    company_id: string|null,
    company_code: string,
    company_name: string,
    company_address: string,
    allowed_amount: string
    contact_person1:string
    contact_person_mobile1:string
    contact_person_designation1:string
    contact_person_email1:string
}

export interface AdvanceTrigger{
  applicant_id: string,
  from_location: string,
  to_location: string,
  start_date_journey: string,
  end_date_journey_expected: string,
  advance_amount: string,
  return_date_amount_expected: string,
  truck_number: string,
  raised_user_id: string,
  approved_user_id: string,
  account_no: string,
  ifsc_code: string,
  approved_amount: string,
  comment_by_mk: string,
  commenyt_by_sh: string,
  approval_status: string
}

export interface Update{
  vehicle_no: string,
  company_name: string,
  applicant_firstname: string,
  // applicant_Date_of_birth: string,
  age: string,
  maritalstatus: string,
  nominee_name: string,
  // nominee_dob: string,
  nominee_age: string,
  nominee_relation: string,
  spouse_name: string,
  applicant_father_firstname: string,
  religion: string,
  applicant_qualification: string,
  applicant_employment_type: string,
  applicant_address_line_1: string,
  applicant_city_name: string,
  applicant_pin: string,
  applicant_mobile_no: string,
  no_of_family_member: string,
  no_of_earning_member: string,
  house_type: string,
  medical_insurance: string,
  current_loan_outstanding_principal: string,
  applicant_income: string,
  income_from_other_sources: string,
  food_expenses: string,
  houserent: string,
  house_renovation_expenses: string,
  updated_by: string|null,
  total_monthly_bill_payment: string,
  applicant_expense_monthly: string,
  applicant_id: string
  current_loan_outstanding_interest: string,
  ration_Card: string
}

export interface AdvanceSaveModel{
  applicant_id: string,
  company_code: string,
  approval_status: string,
  approved_amount: string,
  approved_username: string,
  comment_by_sh: string
}

export interface MetaModel{
  name:string,
  clanguage:string,
  accnum:string,
  loanamout:string,
  pendingamount:string,
  EMIamount:string,
  duedate:string,
  pemi:string
}


export interface DisburseModel{
  date_of_disbursemnet: string,
  amount: string,
  remarks: string,
  loan_id: string,
  transaction_id: string
  disbursement_ifsc:string
  disbursement_account_no:string
}