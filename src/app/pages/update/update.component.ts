import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import Swal from 'sweetalert2';
import { Update } from 'src/app/models/dataModel';

@Component({
  selector: 'app-update',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss'],
})
export class UpdateComponent {
  loginForm!: FormGroup;
  userId = sessionStorage.getItem('userId');
  applicantId = sessionStorage.getItem('applicantId');
  mobile = sessionStorage.getItem('mobile');
  formSubmitted: boolean = false;
  error!: string;
  updatedBy: string = '';
  company: any = [];
  userType = [
    { id: 'A', name: 'Admin' },
    { id: 'N', name: 'User' },
  ];
  maritalStatus = [
    { id: 'Married', name: 'Married' },
    { id: 'Unmarried', name: 'Unmarried' },
    { id: 'Widow', name: 'Widow' },
    { id: 'Widower', name: 'Widower' },
    { id: 'Divorced', name: 'Divorced' },
  ];
  houseType = [
    { id: 'A', name: 'Rented' },
    { id: 'N', name: 'Owned' },
  ];
  jobType = [
    { id: 'Permanent', name: 'Permanent' },
    { id: 'Contract', name: 'Contract' },
  ];
  rationType = [
    { id: 'Y', name: 'Yes' },
    { id: 'N', name: 'No' },
  ];

  relegion = [
    { id: 'Hindu', name: 'Hindu' },
    { id: 'Muslim', name: 'Muslim' },
    { id: 'Christian', name: 'Christian' },
    { id: 'Jain', name: 'Jain' },
    { id: 'Buddhist', name: 'Buddhist' },
    { id: 'Sikh', name: 'Sikh' },
  ];

  qualification = [
    { id: 'A', name: '6th' },
    { id: 'N', name: '7th' },
    { id: 'A', name: '8th' },
    { id: 'N', name: '9th' },
    { id: 'A', name: '10th' },
    { id: 'N', name: '11th' },
    { id: 'A', name: '12th' },
    { id: 'N', name: 'graduate' },
  ];
  medical = [
    { id: 'Y', name: 'Yes' },
    { id: 'N', name: 'No' },
  ];
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private apiService: ApiService
  ) {
    this.loginForm = this.fb.group({
      mobile: [
        '',
        [Validators.required, Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$')],
      ],

      // email: [
      //   '',
      //   [
      //     Validators.required,'^[A-Za-z0-9ñÑáéíóúÁÉÍÓÚ ]+$'
      //     Validators.pattern(/^[\w._-]+[+]?[\w._-]+@[\w.-]+\.[a-zA-Z]{2,6}$/),
      //   ],
      // ],
      firstName: ['', [Validators.required ,Validators.maxLength(20),Validators.pattern('^[A-Za-z0-9ñÑáéíóúÁÉÍÓÚ ]+$')]],
      // dob: ['', [Validators.required]],
      age: ['', [Validators.required ,Validators.maxLength(2),Validators.pattern('^[A-Za-z0-9ñÑáéíóúÁÉÍÓÚ ]+$')]],
      marital: ['', [Validators.required,Validators.maxLength(20),Validators.pattern('^[A-Za-z0-9ñÑáéíóúÁÉÍÓÚ ]+$')]],
      fatherName: ['', [Validators.required,Validators.maxLength(20),Validators.pattern('^[A-Za-z0-9ñÑáéíóúÁÉÍÓÚ ]+$')]],
      spouseName: ['', [Validators.required,Validators.maxLength(20),Validators.pattern('^[A-Za-z0-9ñÑáéíóúÁÉÍÓÚ ]+$')]],
      religion: ['', [Validators.required,Validators.maxLength(20),Validators.pattern('^[A-Za-z0-9ñÑáéíóúÁÉÍÓÚ ]+$')]],
      address: ['', [Validators.required,Validators.maxLength(100)]],
      city: ['', [Validators.required,Validators.maxLength(20),Validators.pattern('^[A-Za-z0-9ñÑáéíóúÁÉÍÓÚ ]+$')]],
      pin: ['', [Validators.required,Validators.maxLength(6)]],
      companyName: ['', [Validators.required,Validators.maxLength(20)]],
      vehicle: ['', [Validators.required,Validators.maxLength(20),Validators.pattern('^[A-Za-z0-9ñÑáéíóúÁÉÍÓÚ ]+$')]],
      qualification: ['', [Validators.required,Validators.maxLength(20),Validators.pattern('^[A-Za-z0-9ñÑáéíóúÁÉÍÓÚ ]+$')]],
      employment: ['', [Validators.required,Validators.maxLength(20),Validators.pattern('^[A-Za-z0-9ñÑáéíóúÁÉÍÓÚ ]+$')]],
      familyMember: ['', [Validators.required,Validators.maxLength(2),Validators.pattern('^[A-Za-z0-9ñÑáéíóúÁÉÍÓÚ ]+$')]],
      earningMember: ['', [Validators.required,Validators.maxLength(2),Validators.pattern('^[A-Za-z0-9ñÑáéíóúÁÉÍÓÚ ]+$')]],
      houseType: ['', [Validators.required,Validators.maxLength(20),Validators.pattern('^[A-Za-z0-9ñÑáéíóúÁÉÍÓÚ ]+$')]],
      medicalInsurance: ['', [Validators.required,Validators.maxLength(20),Validators.pattern('^[A-Za-z0-9ñÑáéíóúÁÉÍÓÚ ]+$')]],
      principle: ['', [Validators.required,Validators.maxLength(6),Validators.pattern('^[A-Za-z0-9ñÑáéíóúÁÉÍÓÚ ]+$')]],
      intrest: ['', [Validators.required,Validators.maxLength(6)]],
      income: ['', [Validators.required,Validators.maxLength(7)]],
      otherIncome: ['', [Validators.required,Validators.maxLength(7)]],
      renovation: ['', [Validators.required,Validators.maxLength(6)]],
      houseRent: ['', [Validators.required,Validators.maxLength(6)]],
      monthlyBill: ['', [Validators.required,Validators.maxLength(6)]],
      expenseMonthly: ['', [Validators.required,Validators.maxLength(6)]],
      ration: ['', [Validators.required,Validators.maxLength(20),Validators.pattern('^[A-Za-z0-9ñÑáéíóúÁÉÍÓÚ ]+$')]],
      nomineeName: ['', [Validators.required,Validators.maxLength(20),Validators.pattern('^[A-Za-z0-9ñÑáéíóúÁÉÍÓÚ ]+$')]],
      // nomineeDob: ['', [Validators.required]],
      nomineeAge: ['', [Validators.required,Validators.maxLength(2)]],
      nomineeRelation: ['', [Validators.required,Validators.maxLength(20),Validators.pattern('^[A-Za-z0-9ñÑáéíóúÁÉÍÓÚ ]+$')]],
      food: ['', [Validators.required,Validators.maxLength(6)]],
    });
  }

  ngOnInit(): void {
    this.getBorrowerDetail();
    console.log(this.apiService.encryptionAES('4682'));
  }

  modifyUser() {
    if (this.loginForm.valid) {
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, save it!',
      }).then((response) => {
        if (response.isConfirmed) {
          const updateApplicantJSON: Update = {
            vehicle_no: this.apiService.encryptionAES(
              this.loginForm.value.vehicle
            ),
            company_name: this.apiService.encryptionAES(
              this.loginForm.value.companyName
            ),
            applicant_firstname: this.apiService.encryptionAES(
              this.loginForm.value.firstName
            ),
            // applicant_Date_of_birth: this.apiService.encryptionAES(this.loginForm.value.dob),
            age: this.apiService.encryptionAES(this.loginForm.value.age.toString()),
            maritalstatus: this.apiService.encryptionAES(
              this.loginForm.value.marital
            ),
            nominee_name: this.apiService.encryptionAES(
              this.loginForm.value.nomineeName
            ),
            // nominee_dob: this.apiService.encryptionAES(this.loginForm.value.nomineeDob),
            nominee_age: this.apiService.encryptionAES(
              this.loginForm.value.nomineeAge
            ),
            nominee_relation: this.apiService.encryptionAES(
              this.loginForm.value.nomineeRelation
            ),
            spouse_name: this.apiService.encryptionAES(
              this.loginForm.value.spouseName
            ),
            applicant_father_firstname: this.apiService.encryptionAES(
              this.loginForm.value.fatherName
            ),
            religion: this.apiService.encryptionAES(
              this.loginForm.value.religion
            ),
            applicant_qualification: this.apiService.encryptionAES(
              this.loginForm.value.qualification
            ),
            applicant_employment_type: this.apiService.encryptionAES(
              this.loginForm.value.employment
            ),
            applicant_address_line_1: this.apiService.encryptionAES(
              this.loginForm.value.address
            ),
            applicant_city_name: this.apiService.encryptionAES(
              this.loginForm.value.city
            ),
            applicant_pin: this.apiService.encryptionAES(
              this.loginForm.value.pin
            ),
            applicant_mobile_no: this.apiService.encryptionAES(
              this.loginForm.value.mobile
            ),
            no_of_family_member: this.apiService.encryptionAES(
              this.loginForm.value.familyMember
            ),
            no_of_earning_member: this.apiService.encryptionAES(
              this.loginForm.value.earningMember
            ),
            house_type: this.apiService.encryptionAES(
              this.loginForm.value.houseType
            ),
            medical_insurance: this.apiService.encryptionAES(
              this.loginForm.value.medicalInsurance
            ),
            current_loan_outstanding_principal: this.apiService.encryptionAES(
              this.loginForm.value.principle
            ),
            applicant_income: this.apiService.encryptionAES(
              this.loginForm.value.income
            ),
            income_from_other_sources: this.apiService.encryptionAES(
              this.loginForm.value.otherIncome
            ),
            food_expenses: this.apiService.encryptionAES(
              this.loginForm.value.food
            ),
            houserent: this.apiService.encryptionAES(
              this.loginForm.value.houseRent
            ),
            house_renovation_expenses: this.apiService.encryptionAES(
              this.loginForm.value.renovation
            ),
            updated_by: this.mobile,
            total_monthly_bill_payment: this.apiService.encryptionAES(
              this.loginForm.value.monthlyBill
            ),
            applicant_expense_monthly: this.apiService.encryptionAES(
              this.loginForm.value.expenseMonthly
            ),
            applicant_id: this.apiService.encryptionAES(this.applicantId),
            current_loan_outstanding_interest: this.apiService.encryptionAES(
              this.loginForm.value.intrest
            ),
            ration_Card: this.apiService.encryptionAES(
              this.loginForm.value.ration
            ),
          };
          this.apiService
            .postUpdateApplicant(updateApplicantJSON)
            .pipe()
            .subscribe({
              next: (response) => {
                if (this.apiService.decryptionAES(response.status) == 'false') {
                  Swal.fire(
                    'unsaved',
                    'Your detail has not been saved.',
                    'error'
                  );
                } else {
                  Swal.fire('Saved', 'Your detail has been saved.', 'success');
                  
                  setTimeout(() => {
                    this.router.navigate(['pages/home']);
                  }, 2000);
                  
                }
              },
              // error: (err) => {
              //   console.log(err);
              // },
              // complete: () => {},
            });
        }
      });
    } else {
      Swal.fire('', 'Please Provide Correct Data', 'error');
    }
    console.log(this.loginForm);
  }

  

  getBorrowerDetail() {
    this.apiService
      .getapplicantById1(this.apiService.encryptionAES(this.applicantId))
      .pipe()
      .subscribe({
        next: (response) => {
          if (response.applicant) {
            response.applicant.forEach((element: any) => {
              if (element.applicant_firstname) {
                element.applicant_firstname = this.apiService.decryptionAES(
                  element.applicant_firstname
                );
              }
              if (element.vehicle_no) {
                element.vehicle_no = this.apiService.decryptionAES(
                  element.vehicle_no
                );
              }
              if (element.company_name) {
                element.company_name = this.apiService.decryptionAES(
                  element.company_name
                );
              }
              if (element.applicant_Date_of_birth) {
                element.applicant_Date_of_birth = this.apiService.decryptionAES(
                  element.applicant_Date_of_birth
                );
              }
              if (element.age) {
                element.age = this.apiService.decryptionAES(element.age);
              }
              if (element.maritalstatus) {
                element.maritalstatus = this.apiService.decryptionAES(
                  element.maritalstatus
                );
              }
              if (element.nominee_name) {
                element.nominee_name = this.apiService.decryptionAES(
                  element.nominee_name
                );
              }
              if (element.nominee_dob) {
                element.nominee_dob = this.apiService.decryptionAES(
                  element.nominee_dob
                );
              }
              if (element.nominee_age) {
                element.nominee_age = this.apiService.decryptionAES(
                  element.nominee_age
                );
              }
              if (element.nominee_relation) {
                element.nominee_relation = this.apiService.decryptionAES(
                  element.nominee_relation
                );
              }
              if (element.spouse_name) {
                element.spouse_name = this.apiService.decryptionAES(
                  element.spouse_name
                );
              }
              if (element.applicant_father_firstname) {
                element.applicant_father_firstname =
                  this.apiService.decryptionAES(
                    element.applicant_father_firstname
                  );
              }
              if (element.religion) {
                element.religion = this.apiService.decryptionAES(
                  element.religion
                );
              }
              if (element.applicant_qualification) {
                element.applicant_qualification = this.apiService.decryptionAES(
                  element.applicant_qualification
                );
              }
              if (element.applicant_employment_type) {
                element.applicant_employment_type =
                  this.apiService.decryptionAES(
                    element.applicant_employment_type
                  );
              }
              if (element.applicant_address_line_1) {
                element.applicant_address_line_1 =
                  this.apiService.decryptionAES(
                    element.applicant_address_line_1
                  );
              }
              if (element.applicant_city_name) {
                element.applicant_city_name = this.apiService.decryptionAES(
                  element.applicant_city_name
                );
              }
              if (element.applicant_pin) {
                element.applicant_pin = this.apiService.decryptionAES(
                  element.applicant_pin
                );
              }
              if (element.applicant_mobile_no) {
                element.applicant_mobile_no = this.apiService.decryptionAES(
                  element.applicant_mobile_no
                );
              }
              if (element.no_of_family_member) {
                element.no_of_family_member = this.apiService.decryptionAES(
                  element.no_of_family_member
                );
              }
              if (element.no_of_earning_member) {
                element.no_of_earning_member = this.apiService.decryptionAES(
                  element.no_of_earning_member
                );
              }
              if (element.house_type) {
                element.house_type = this.apiService.decryptionAES(
                  element.house_type
                );
              }
              if (element.medical_insurance) {
                element.medical_insurance = this.apiService.decryptionAES(
                  element.medical_insurance
                );
              }
              if (element.current_loan_outstanding_principal) {
                element.current_loan_outstanding_principal =
                  this.apiService.decryptionAES(
                    element.current_loan_outstanding_principal
                  );
              }
              if (element.current_loan_outstanding_Stringerest) {
                element.current_loan_outstanding_Stringerest =
                  this.apiService.decryptionAES(
                    element.current_loan_outstanding_Stringerest
                  );
              }
              if (element.applicant_income) {
                element.applicant_income = this.apiService.decryptionAES(
                  element.applicant_income
                );
              }
              if (element.income_from_other_sources) {
                element.income_from_other_sources =
                  this.apiService.decryptionAES(
                    element.income_from_other_sources
                  );
              }
              if (element.food_expenses) {
                element.food_expenses = this.apiService.decryptionAES(
                  element.food_expenses
                );
              }
              if (element.houserent) {
                element.houserent = this.apiService.decryptionAES(
                  element.houserent
                );
              }
              if (element.house_renovation_expenses) {
                element.house_renovation_expenses =
                  this.apiService.decryptionAES(
                    element.house_renovation_expenses
                  );
              }
              if (element.total_monthly_bill_payment) {
                element.total_monthly_bill_payment =
                  this.apiService.decryptionAES(
                    element.total_monthly_bill_payment
                  );
              }
              if (element.applicant_expense_monthly) {
                element.applicant_expense_monthly =
                  this.apiService.decryptionAES(
                    element.applicant_expense_monthly
                  );
              }
              if (element.ration_Card) {
                element.ration_Card = this.apiService.decryptionAES(
                  element.ration_Card
                );
              }
            });
          }
          this.loginForm.controls['firstName'].setValue(
            response.applicant[0].applicant_firstname
          );
          // this.loginForm.controls['dob'].setValue(response.applicant[0].applicant_Date_of_birth);
          this.loginForm.controls['age'].setValue(response.applicant[0].age);
          this.loginForm.controls['marital'].setValue(
            response.applicant[0].maritalstatus
          );
          this.loginForm.controls['fatherName'].setValue(
            response.applicant[0].applicant_father_firstname
          );
          this.loginForm.controls['spouseName'].setValue(
            response.applicant[0].spouse_name
          );
          this.loginForm.controls['religion'].setValue(
            response.applicant[0].religion
          );
          this.loginForm.controls['address'].setValue(
            response.applicant[0].applicant_address_line_1
          );
          this.loginForm.controls['city'].setValue(
            response.applicant[0].applicant_city_name
          );
          this.loginForm.controls['pin'].setValue(
            response.applicant[0].applicant_pin
          );
          this.loginForm.controls['companyName'].setValue(
            response.applicant[0].company_name
          );
          this.loginForm.controls['vehicle'].setValue(
            response.applicant[0].vehicle_no
          );
          this.loginForm.controls['qualification'].setValue(
            response.applicant[0].applicant_qualification
          );
          this.loginForm.controls['employment'].setValue(
            response.applicant[0].applicant_employment_type
          );
          this.loginForm.controls['familyMember'].setValue(
            response.applicant[0].no_of_family_member
          );
          this.loginForm.controls['earningMember'].setValue(
            response.applicant[0].no_of_earning_member
          );
          this.loginForm.controls['houseType'].setValue(
            response.applicant[0].house_type
          );
          this.loginForm.controls['medicalInsurance'].setValue(
            response.applicant[0].medical_insurance
          );
          this.loginForm.controls['principle'].setValue(
            response.applicant[0].current_loan_outstanding_principal
          );
          this.loginForm.controls['intrest'].setValue(
            response.applicant[0].current_loan_outstanding_Stringerest
          );
          this.loginForm.controls['income'].setValue(
            response.applicant[0].applicant_income
          );
          this.loginForm.controls['otherIncome'].setValue(
            response.applicant[0].income_from_other_sources
          );
          this.loginForm.controls['renovation'].setValue(
            response.applicant[0].house_renovation_expenses
          );
          this.loginForm.controls['houseRent'].setValue(
            response.applicant[0].houserent
          );
          this.loginForm.controls['monthlyBill'].setValue(
            response.applicant[0].total_monthly_bill_payment
          );
          this.loginForm.controls['expenseMonthly'].setValue(
            response.applicant[0].applicant_expense_monthly
          );
          this.loginForm.controls['ration'].setValue(
            response.applicant[0].ration_Card
          );
          this.loginForm.controls['nomineeName'].setValue(
            response.applicant[0].nominee_name
          );
          // this.loginForm.controls['nomineeDob'].setValue(response.applicant[0].nominee_dob);
          this.loginForm.controls['nomineeAge'].setValue(
            response.applicant[0].nominee_age
          );
          this.loginForm.controls['nomineeRelation'].setValue(
            response.applicant[0].nominee_relation
          );
          this.loginForm.controls['mobile'].setValue(
            response.applicant[0].applicant_mobile_no
          );
          this.loginForm.controls['food'].setValue(
            response.applicant[0].food_expenses
          );
          // this.loginForm.controls['firstName'].setValue(response.applicant[0].applicant_firstname);
          // this.loginForm.controls['firstName'].setValue(response.applicant[0].applicant_firstname);
          // this.loginForm.controls['firstName'].setValue(response.applicant[0].applicant_firstname);
          // this.loginForm.controls['firstName'].setValue(response.applicant[0].applicant_firstname);
          // this.loginForm.controls['firstName'].setValue(response.applicant[0].applicant_firstname);
          // this.loginForm.controls['firstName'].setValue(response.applicant[0].applicant_firstname);
          // this.loginForm.controls['firstName'].setValue(response.applicant[0].applicant_firstname);
          // this.loginForm.controls['firstName'].setValue(response.applicant[0].applicant_firstname);
          // this.loginForm.controls['firstName'].setValue(response.applicant[0].applicant_firstname);
          // this.loginForm.controls['firstName'].setValue(response.applicant[0].applicant_firstname);
          // this.loginForm.controls['firstName'].setValue(response.applicant[0].applicant_firstname);
          // this.loginForm.controls['firstName'].setValue(response.applicant[0].applicant_firstname);
          console.log(response.applicant[0].nominee_age);
          console.log(typeof response.applicant[0].nominee_age);
        },
        error: (err) => {
          console.log(err);
        },
        complete: () => {},
      });
  }

  // getcompanyData(){
  //   this.apiService
  //   .postcompanyDetails()
  //   .pipe()
  //   .subscribe({
  //     next: (response) => {
  //       if (response) {
  //         this.company= response.company;
  //         if (response.company) {
  //           response.company.forEach((element: any) => {
  //             if (element.company_name) {
  //               element.company_name = this.apiService.decryptionAES(
  //                 element.company_name
  //               );
  //             }

  //           });
  //         }
  //         console.log(this.company);
  //       }
  //     },
  //     error: (err) => {
  //       console.log(err);
  //     },
  //     complete: () => {},
  //   });
  // }
  back() {
    this.router.navigate(['pages/home']);
  }

  clear(){
    this.loginForm.reset()
  }
}
