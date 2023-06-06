import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
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
          console.log(this.applicantsData);
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
}
