import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import Swal from 'sweetalert2';
import { Update } from 'src/app/models/dataModel';

@Component({
  selector: 'app-update',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss']
})
export class UpdateComponent {
  loginForm!: FormGroup;
  userId=sessionStorage.getItem('userId')
  applicantId=sessionStorage.getItem('applicantId')
  formSubmitted: boolean = false;
  error!: string;
  company:any = [];
  userType = [
    { id: 'A', name: 'Admin' },
    { id: 'N', name: 'User' },
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
      //     Validators.required,
      //     Validators.pattern(/^[\w._-]+[+]?[\w._-]+@[\w.-]+\.[a-zA-Z]{2,6}$/),
      //   ],
      // ],
      firstName: ['', [Validators.required]],
      dob: ['', [Validators.required]],
      age: ['', [Validators.required]],
      marital: ['', [Validators.required]],
      fatherName: ['', [Validators.required]],
      spouseName: ['', [Validators.required]],
      religion: ['', [Validators.required]],
      address: ['', [Validators.required]],
      city: ['', [Validators.required]],
      pin: ['', [Validators.required]],
      companyName: ['', [Validators.required]],
      vehicle: ['', [Validators.required]],
      qualification: ['', [Validators.required]],
      employment: ['', [Validators.required]],
      familyMember: ['', [Validators.required]],
      earningMember: ['', [Validators.required]],
      houseType: ['', [Validators.required]],
      medicalInsurance: ['', [Validators.required]],
      principle: ['', [Validators.required]],
      intrest: ['', [Validators.required]],
      income: ['', [Validators.required]],
      otherIncome: ['', [Validators.required]],
      renovation: ['', [Validators.required]],
      houseRent: ['', [Validators.required]],
      monthlyBill: ['', [Validators.required]],
      expenseMonthly: ['', [Validators.required]],
      ration: ['', [Validators.required]],
      nomineeName: ['', [Validators.required]],
      nomineeDob: ['', [Validators.required]],
      nomineeAge: ['', [Validators.required]],
      nomineeRelation: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.getBorrowerDetail()
    
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
  vehicle_no: this.apiService.encryptionAES(this.loginForm.value.firstName),
  company_name: this.apiService.encryptionAES(this.loginForm.value.firstName),
  applicant_firstname: this.apiService.encryptionAES(this.loginForm.value.firstName),
  applicant_Date_of_birth: this.apiService.encryptionAES(this.loginForm.value.firstName),
  age: this.apiService.encryptionAES(this.loginForm.value.firstName),
  maritalstatus: this.apiService.encryptionAES(this.loginForm.value.firstName),
  nominee_name: this.apiService.encryptionAES(this.loginForm.value.firstName),
  nominee_dob: this.apiService.encryptionAES(this.loginForm.value.firstName),
  nominee_age: this.apiService.encryptionAES(this.loginForm.value.firstName),
  nominee_relation: this.apiService.encryptionAES(this.loginForm.value.firstName),
  spouse_name: this.apiService.encryptionAES(this.loginForm.value.firstName),
  applicant_father_firstname: this.apiService.encryptionAES(this.loginForm.value.firstName),
  religion: this.apiService.encryptionAES(this.loginForm.value.firstName),
  applicant_qualification: this.apiService.encryptionAES(this.loginForm.value.firstName),
  applicant_employment_type: this.apiService.encryptionAES(this.loginForm.value.firstName),
  applicant_address_line_1: this.apiService.encryptionAES(this.loginForm.value.firstName),
  applicant_city_name: this.apiService.encryptionAES(this.loginForm.value.firstName),
  applicant_pin: this.apiService.encryptionAES(this.loginForm.value.firstName),
  applicant_mobile_no: this.apiService.encryptionAES(this.loginForm.value.firstName),
  no_of_family_member: this.apiService.encryptionAES(this.loginForm.value.firstName),
  no_of_earning_member: this.apiService.encryptionAES(this.loginForm.value.firstName),
  house_type: this.apiService.encryptionAES(this.loginForm.value.firstName),
  medical_insurance: this.apiService.encryptionAES(this.loginForm.value.firstName),
  current_loan_outstanding_principal: this.apiService.encryptionAES(this.loginForm.value.firstName),
  applicant_income: this.apiService.encryptionAES(this.loginForm.value.firstName),
  income_from_other_sources: this.apiService.encryptionAES(this.loginForm.value.firstName),
  food_expenses: this.apiService.encryptionAES(this.loginForm.value.firstName),
  houserent: this.apiService.encryptionAES(this.loginForm.value.firstName),
  house_renovation_expenses: this.apiService.encryptionAES(this.loginForm.value.firstName),
  updated_by: this.apiService.encryptionAES(this.loginForm.value.firstName),
  total_monthly_bill_payment: this.apiService.encryptionAES(this.loginForm.value.firstName),
  applicant_expense_monthly: this.apiService.encryptionAES(this.loginForm.value.firstName),
  applicant_id: this.apiService.encryptionAES(this.loginForm.value.firstName),
  current_loan_outstanding_interest: this.apiService.encryptionAES(this.loginForm.value.firstName),
  ration_Card: this.apiService.encryptionAES(this.loginForm.value.firstName)
      
    };
    this.apiService
      .postUpdateApplicant(updateApplicantJSON)
      .pipe()
      .subscribe({
        next: (response) => {
          if(this.apiService.decryptionAES(response.status) == 'false'){
          Swal.fire('unsaved', 'Your detail has not been saved.', 'error');
        }else{
          Swal.fire('Saved', 'Your detail has been saved.', 'success');
        }
      
      },
        // error: (err) => {
        //   console.log(err);
        // },
        // complete: () => {},
        
      });
     
    }
  });
  }
    console.log(this.loginForm);
  }


      getBorrowerDetail() {
        
            this.apiService
              .getapplicantById(this.applicantId)
              .pipe()
              .subscribe({
                next: (response) => {
                  if (response) {
                    this.loginForm.controls['firstName'].setValue(response.applicant[0].applicant_firstname);
                    this.loginForm.controls['dob'].setValue(response.applicant[0].applicant_firstname);
                    this.loginForm.controls['age'].setValue(response.applicant[0].applicant_firstname);
                    this.loginForm.controls['marital'].setValue(response.applicant[0].applicant_firstname);
                    this.loginForm.controls['fatherName'].setValue(response.applicant[0].applicant_firstname);
                    this.loginForm.controls['spouseName'].setValue(response.applicant[0].applicant_firstname);
                    this.loginForm.controls['religion'].setValue(response.applicant[0].applicant_firstname);
                    this.loginForm.controls['address'].setValue(response.applicant[0].applicant_firstname);
                    this.loginForm.controls['city'].setValue(response.applicant[0].applicant_firstname);
                    this.loginForm.controls['pin'].setValue(response.applicant[0].applicant_firstname);
                    this.loginForm.controls['companyName'].setValue(response.applicant[0].applicant_firstname);
                    this.loginForm.controls['vehicle'].setValue(response.applicant[0].applicant_firstname);
                    this.loginForm.controls['qualification'].setValue(response.applicant[0].applicant_firstname);
                    this.loginForm.controls['employment'].setValue(response.applicant[0].applicant_firstname);
                    this.loginForm.controls['familyMember'].setValue(response.applicant[0].applicant_firstname);
                    this.loginForm.controls['earningMember'].setValue(response.applicant[0].applicant_firstname);
                    this.loginForm.controls['firstName'].setValue(response.applicant[0].applicant_firstname);
                    this.loginForm.controls['firstName'].setValue(response.applicant[0].applicant_firstname);
                    this.loginForm.controls['firstName'].setValue(response.applicant[0].applicant_firstname);
                    this.loginForm.controls['firstName'].setValue(response.applicant[0].applicant_firstname);
                    this.loginForm.controls['firstName'].setValue(response.applicant[0].applicant_firstname);
                    this.loginForm.controls['firstName'].setValue(response.applicant[0].applicant_firstname);
                    this.loginForm.controls['firstName'].setValue(response.applicant[0].applicant_firstname);
                    this.loginForm.controls['firstName'].setValue(response.applicant[0].applicant_firstname);
                    this.loginForm.controls['firstName'].setValue(response.applicant[0].applicant_firstname);
                    this.loginForm.controls['firstName'].setValue(response.applicant[0].applicant_firstname);
                    this.loginForm.controls['firstName'].setValue(response.applicant[0].applicant_firstname);
                    this.loginForm.controls['firstName'].setValue(response.applicant[0].applicant_firstname);
                    this.loginForm.controls['firstName'].setValue(response.applicant[0].applicant_firstname);
                    this.loginForm.controls['firstName'].setValue(response.applicant[0].applicant_firstname);
                    this.loginForm.controls['firstName'].setValue(response.applicant[0].applicant_firstname);
                    this.loginForm.controls['firstName'].setValue(response.applicant[0].applicant_firstname);
                    this.loginForm.controls['firstName'].setValue(response.applicant[0].applicant_firstname);
                    this.loginForm.controls['firstName'].setValue(response.applicant[0].applicant_firstname);
                    this.loginForm.controls['firstName'].setValue(response.applicant[0].applicant_firstname);
                    this.loginForm.controls['firstName'].setValue(response.applicant[0].applicant_firstname);
                    this.loginForm.controls['firstName'].setValue(response.applicant[0].applicant_firstname);
                    this.loginForm.controls['firstName'].setValue(response.applicant[0].applicant_firstname);
                    this.loginForm.controls['firstName'].setValue(response.applicant[0].applicant_firstname);
                    this.loginForm.controls['firstName'].setValue(response.applicant[0].applicant_firstname);
                    this.loginForm.controls['firstName'].setValue(response.applicant[0].applicant_firstname);
                    this.loginForm.controls['firstName'].setValue(response.applicant[0].applicant_firstname);
                    this.loginForm.controls['firstName'].setValue(response.applicant[0].applicant_firstname);
                    this.loginForm.controls['firstName'].setValue(response.applicant[0].applicant_firstname);
                    console.log(response.applicant[0]);
                    
                  }
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
}
