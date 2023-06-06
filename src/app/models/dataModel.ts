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
}
