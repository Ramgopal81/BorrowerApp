
export interface ApplicantsResponseModel {
  applicant_id: number | string;
  userIdStr: string;
  loanAmount: number | string;
  purposeOfLoan: number | string;
  groupId: number | string;
  anygroup: boolean;
  published: boolean;
  spouse_name: string;
  mother_name: string;
  aadhar_no: number | string;
  pan_no: number | string;
  account_no: number | string;
  dataentdt: number | string;
  datamoddt: Date | string;
  applicant_address_line_1: number | string;
  applicant_address_line_2: number | string;
  applicant_address_line_3: number | string;
  applicant_state: string;
  applicant_PIN: number;
  applicant_firstname: string;
  applicant_middle_name: string;
  applicant_lastname: string;
  applicant_email_id: string;
  applicant_mobile_no: string | number;
  applicant_family_mobile_no: string | number;
  applicant_date_of_birth: Date | string;
  gender: string;
  applicant_father_firstname: string;
  applicant_father_middle_name: string;
  applicant_father_lastname: string;
  applicant_city_name: string;
  submited: boolean;
  no_of_family_member: number;
  no_of_earning_member: number;
  no_of_children: number;
  no_of_children_studying: number;
  education_expenses_on_children: string | number;
  no_of_sick_members: number;
  applicant_alcoholic: boolean;
  applicant_tobacco_smoking_or_chewing: boolean;
  friend1_name: string;
  friend1_mobile_no: string;
  friend1_job: string;
  friend2_name: string;
  friend2_mobile_no: string | number;
  friend2_job: string;
  house_locality: string;
  house_rent_type: string;
  house_type: string;
  applicant_agr_land_owned: boolean;
  applicant_land_area: string | number;
  applicant_shop_owned: boolean;
  applicant_qualification: string;
  applicant_job: string;
  type_of_income: string;
  applicant_income_agriculture: boolean;
  applicant_income_non_agriculture: boolean;
  applicant_total_income_agriculture_session: string | number;
  applicant_total_income_agriculture_crop: string | number;
  applicant_non_agriculture_income_type: string;
  applicant_role: string;
  applicant_income: string | number;
  applicant_employment_type: string;
  applicant_industry_stable: boolean;
  applicant_organisation_type: string;
  applicant_business: string;
  applicant_business_product: string;
  applicant_business_turnover: string;
  applicant_business_income: string;
  applicant_customer: string;
  applicant_business_other: string;
  applicant_rasan_card_type: string;
  applicant_hold_bank_account: boolean;
  applicant_invest: boolean;
  applicant_owned_tractor: boolean;
  applicant_owned_car: boolean;
  applicant_owned_scooter_motorcycle: boolean;
  applicant_owned_bicycle: boolean;
  applicant_owned_auto: boolean;
  applicant_bank_loan: boolean;
  applicant_sahukar_loan: boolean;
  applicant_loan_amount: string | number;
  applicant_loan_amount_sahukar: string | number;
  applicant_have_agriculture_machinery: boolean;
  applicant_have_non_agriculture_machinery: boolean;
  applicant_expense_monthly: string | number;
  applicant_education_expense_monthly: string | number;
  applicant_medical_expense: string | number;
  applicant_children_school_type: string;
  maritalstatus: any;
  houserent: any;
  landunit: any;
  applicant_bill_amount: string | number;
  applicant_bill_paid: any;
  applicant_kisan_card: any;
  loanskill: any;
  is_having_livestock: boolean;
  is_having_electricit: boolean;
  food_expenses: number;
  utilities_expenses: number;
  transport_expenses: number;
  clothing_expenses: number;
  house_renovation_expenses: number;
  functions_expenses: number;
  land_area_inacres: number;
  appl_main_income_src: any;
  authorisation_status: number;
  psycho_page: boolean;
  prediciton: any;
  latitude: string | number;
  longitude: string | number;
  psyAns: any;
  is_having_cell: boolean;
  family_covered_under_aayushman_or_similar_scheme: boolean;
  mk_approval: any;
  av_approval: any;
  sh_approval: any;
}

export interface UsersResponseModel {
  company_name:any
  email_id: any
  firstname:any
  lastname:any
  mobile_no:any
  password:any
  role:any
  user_id:any
}

