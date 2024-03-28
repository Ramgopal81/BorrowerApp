import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as saveAs from 'file-saver';
import {
  AuthorisationFormModel,
  Authorize,
  Detail,
} from 'src/app/models/dataModel';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { NgxPaginationModule } from 'ngx-pagination';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ApplicantsResponseModel } from 'src/app/models/api-responseModel';
import { debounceTime, fromEvent, map } from 'rxjs';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, NgxPaginationModule,NgxDatatableModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit,AfterViewInit{
  @ViewChild("filterInput") filterInput!: any;
  detail: Detail = new Detail();
  authorize: Authorize = new Authorize();
  currRadioCheckedId: any;
  viewUrl:string='https://www.africau.edu/images/default/sample.pdf'
  applicantsData!: ApplicantsResponseModel[];
  tempArray!:ApplicantsResponseModel[];
  applicantType:any =  sessionStorage.getItem('companyCode')
  constructor(private router: Router, private apiService: ApiService) {}
  users: any = [];
  authorisedButtonText: string = '';
  authorizeBy: string = '';
  companyName: string = '';
  rows=''
  ngOnInit(): void {
    this.getApplicationData()
console.log(this.applicantType);

  }

  ngAfterViewInit(): void {
    fromEvent(this.filterInput.nativeElement, "keyup")
      .pipe(
        debounceTime(300),
        map((x: any) => x["target"]["value"])
      )
      .subscribe((value) => {
        this.filterDatatable(value);
      });
  }

  handleCheck(event: any, userName: string) {
    //   let d = document.getElementById('ram') as HTMLElement
    // console.log(d);
    console.log(event.target.checked);
    if (event.target.checked) {
      this.users.push(userName);
    } else {
      if (this.users.length) {
        for (var i = 0; i < this.users.length; i++) {
          if (this.users[i] == userName) {
            this.users.splice(i, 1);
          }
        }
      }
    }
    console.log(this.users);
  }

  viewBorrowerDetail(id: string) {
    this.router.navigate(['pages/borrowerDetails'], {
      queryParams: { id: id },
    });
  }

  checkRadio(authorisation_status: any, applicant_id: any) {
    this.currRadioCheckedId = applicant_id;
    if (authorisation_status == '0') {
      this.authorisedButtonText = 'Arthavedika';
    }
   else if (authorisation_status == '1') {
      this.authorisedButtonText = 'MissCall Pay';
    }
   else if (authorisation_status == '2') {
      this.authorisedButtonText = 'Share India';
    }
  }

  getApplicationData(){
    this.apiService
    .postDetails('AV')
    .pipe()
    .subscribe({
      next: (response) => {
        if (response) {
          this.applicantsData= this.tempArray = response.applicant;
          if (response.applicant) {
            response.applicant.forEach((element: any) => {
              if (element.applicant_id) {
                element.applicant_id = this.apiService.decryptionAES(element.applicant_id);
              }
              if (element.applicant_firstname) {
                element.applicant_firstname = this.apiService.decryptionAES(element.applicant_firstname);
              }
              if (element.applicant_lastname) {
                element.applicant_lastname = this.apiService.decryptionAES(element.applicant_lastname);
              }
              if (element.applicant_email_id) {
                element.applicant_email_id = this.apiService.decryptionAES(element.applicant_email_id);
              }
              if (element.company_name) {
                element.company_name = this.apiService.decryptionAES(element.company_name);
              }
              if (element.applicant_mobile_no) {
                element.applicant_mobile_no = this.apiService.decryptionAES(element.applicant_mobile_no);
              }
              if (element.av_approval) {
                element.av_approval = this.apiService.decryptionAES(element.av_approval);
              }
              if (element.mk_approval) {
                element.mk_approval = this.apiService.decryptionAES(element.mk_approval);
              }
              if (element.sh_approval) {
                element.sh_approval = this.apiService.decryptionAES(element.sh_approval);
              }
            
            });
          }
        }
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {},
    });
  }
 
  filterDatatable(key: string) {
    let filterKey = key.toString().toLowerCase().trim();
    const count = 1;
    const keys = Object.keys(this.tempArray[0]);
    console.log(keys);
    
    //@ts-ignore
    this.applicantsData = this.tempArray.filter((item: any) => {
      // iterate through each row's [currently only name] column data
      for (let i = 0; i < count; i++) {
        
        // check for a match
        if (
          (item?.applicant_firstname &&
            item?.applicant_firstname
              .toString()
              .toLowerCase()
              .indexOf(filterKey) !== -1) ||
          !filterKey
        ) {
          // found match, return true to add to result set
          return true;
        }
      }
    });
  }
  // authorizeApplicant(){
  //   this.authorize.applicant_id = this.users
  //   this.authorize.authorized_by = this.authorizeBy
  //   this.authorize.company_Name = this.companyName
  //   this.service.postauthorize(this.authorize).subscribe((result) => {

  //     Swal.fire({
  //       position: 'center',
  //       icon: result.status ? 'success' : 'error',
  //       title: result.message,
  //       // confirmButtonText: result.status
  //       //   ? 'Proceed to Psychometric Question'
  //       //   : 'Proceed to next Application',
  //       showCloseButton: true,
  //     }).then((response) => {
  //       if (response.isConfirmed) {
  //         if (result.status) {
  //           // this.router.navigate(['/pages/dashboard']);
  //         }
  //         //  else {
  //         //   this.router.navigate(['/basic']);
  //         // }
  //       }
  //     });
  //   });
  // }
  downloadCSV(): void {
   
    this.viewUrl='http://20.83.180.143:9080/applicant/downloadTruckerscsv'
    console.log(this.viewUrl);
    window.open(
      this.viewUrl,'_blank'
     );
  }

  update(){
    this.router.navigate(['/update']);
  }
}
