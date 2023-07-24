import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ColumnMode, NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ApiService } from 'src/app/services/api.service';
import { ApplicantsResponseModel, UsersResponseModel } from 'src/app/models/api-responseModel';
import { Authorize, Detail } from 'src/app/models/dataModel';
import { debounceTime, fromEvent, map } from 'rxjs';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule,NgxDatatableModule,FormsModule],
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit,AfterViewInit{

  reorderable = true;
  ColumnMode = ColumnMode;

  

  @ViewChild("filterInput") filterInput!: any;
  detail: Detail = new Detail();
  authorize: Authorize = new Authorize();
  currRadioCheckedId: any;
  userData!: UsersResponseModel[];
  tempArray!:UsersResponseModel[];
  userId:any 
  loadingIndicator = true;
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

  viewBorrowerDetail(id: any) {
    this.router.navigate(['pages/modifyUser'], {
      queryParams: { id: id },
    });
  }

  createUser(){
    this.router.navigate(['pages/createUser'])
  }
  modifyUser(){
   
      sessionStorage.setItem('userId',this.userId)
   this.router.navigate(['pages/modifyUser'])
    
  }

  deleteUser(){
      this.apiService
      .postDelete(this.apiService.encryptionAES(this.userId))
      .pipe()
      .subscribe({
        next: (response) => {
          if (response) {
          console.log(response);
          
          }
        },
        error: (err) => {
          console.log(err);
        },
        complete: () => {},
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
    .postuserDetails()
    .pipe()
    .subscribe({
      next: (response) => {
        if (response) {
          this.userData= this.tempArray = response.user;
          if (response.user) {
            response.user.forEach((element: any) => {
              if (element.user_id) {
                element.user_id = this.apiService.decryptionAES(element.user_id);
              }
              if (element.firstname) {
                element.firstname = this.apiService.decryptionAES(element.firstname);
              }
              if (element.lastname) {
                element.lastname = this.apiService.decryptionAES(element.lastname);
              }
              if (element.email_id) {
                element.email_id = this.apiService.decryptionAES(element.email_id);
              }
              if (element.mobile_no) {
                element.mobile_no = this.apiService.decryptionAES(element.mobile_no);
              }
              if (element.companyName) {
                element.companyName = this.apiService.decryptionAES(element.companyName);
              }
              if (element.company_code) {
                element.company_code = this.apiService.decryptionAES(element.company_code);
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
    this.userData = this.tempArray.filter((item: any) => {
      // iterate through each row's [currently only name] column data
      for (let i = 0; i < count; i++) {
        
        // check for a match
        if (
          (item?.firstname &&
            item?.firstname
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
}
