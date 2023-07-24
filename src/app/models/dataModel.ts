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
