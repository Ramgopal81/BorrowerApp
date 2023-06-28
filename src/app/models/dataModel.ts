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
