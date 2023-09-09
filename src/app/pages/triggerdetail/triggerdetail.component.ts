import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { debounceTime, fromEvent, map } from 'rxjs';
import { AdvanceTriggerModel } from 'src/app/models/api-responseModel';

@Component({
  selector: 'app-triggerdetail',
  standalone: true,
  imports: [CommonModule, NgxPaginationModule,NgxDatatableModule],
  templateUrl: './triggerdetail.component.html',
  styleUrls: ['./triggerdetail.component.scss']
})
export class TriggerdetailComponent implements OnInit,AfterViewInit{
  @ViewChild("filterInput") filterInput!: any;
  applicantsData!: AdvanceTriggerModel[];
  tempArray!:AdvanceTriggerModel[];

  constructor(private router: Router, private apiService: ApiService) {}

  ngOnInit(): void {
    this.getApplicationData()
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

  viewBorrowerDetail(id: string) {
    this.router.navigate(['pages/advanceDetail'], {
      queryParams: { id: id },
    });
  }
  
  getApplicationData(){
    this.apiService
    .postAdvanceDetails()
    .pipe()
    .subscribe({
      next: (response) => {
        if (response) {
          this.applicantsData= this.tempArray = response.list;
          if (response.list) {
            response.list.forEach((element: any) => {
              if (element.applicant_id) {
                element.applicant_id = this.apiService.decryptionAES(element.applicant_id);
              }
              if (element.from_location) {
                element.from_location = this.apiService.decryptionAES(element.from_location);
              }
              if (element.to_location) {
                element.to_location = this.apiService.decryptionAES(element.to_location);
              }
              if (element.start_date_journey) {
                element.start_date_journey = this.apiService.decryptionAES(element.start_date_journey);
              }
              if (element.end_date_journey_expected) {
                element.end_date_journey_expected = this.apiService.decryptionAES(element.end_date_journey_expected);
              }
              if (element.advance_amount) {
                element.advance_amount = this.apiService.decryptionAES(element.advance_amount);
              }
              if (element.return_date_amount_expected) {
                element.return_date_amount_expected = this.apiService.decryptionAES(element.return_date_amount_expected);
              }
              if (element.truck_number) {
                element.truck_number = this.apiService.decryptionAES(element.truck_number);
              }
              if (element.raised_user_id) {
                element.raised_user_id = this.apiService.decryptionAES(element.raised_user_id);
              }
              if (element.approved_user_id) {
                element.approved_user_id = this.apiService.decryptionAES(element.approved_user_id);
              }
              if (element.account_no) {
                element.account_no = this.apiService.decryptionAES(element.account_no);
              }
              if (element.ifsc_code) {
                element.ifsc_code = this.apiService.decryptionAES(element.ifsc_code);
              }
              if (element.approved_amount) {
                element.approved_amount = this.apiService.decryptionAES(element.approved_amount);
              }
              if (element.comment_by_mk) {
                element.comment_by_mk = this.apiService.decryptionAES(element.comment_by_mk);
              }
              if (element.commenyt_by_sh) {
                element.commenyt_by_sh = this.apiService.decryptionAES(element.commenyt_by_sh);
              }
              if (element.approval_status) {
                element.approval_status = this.apiService.decryptionAES(element.approval_status);
              }
            });
            console.log(this.applicantsData);
            
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
          (item?.applicant_id &&
            item?.applicant_id
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
