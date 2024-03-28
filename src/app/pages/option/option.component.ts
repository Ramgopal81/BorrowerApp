import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ColumnMode, NgxDatatableModule } from '@swimlane/ngx-datatable';
import { UploadResponceModel } from 'src/app/models/api-responseModel';
import { debounceTime, fromEvent, map } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-option',
  standalone: true,
  imports: [CommonModule,NgxDatatableModule],
  templateUrl: './option.component.html',
  styleUrls: ['./option.component.scss']
})
export class OptionComponent implements OnInit, AfterViewInit{
  reorderable = true;
  ColumnMode = ColumnMode;
  @ViewChild('filterInput') filterInput!: any;
  userData!: UploadResponceModel[];
  tempArray!: UploadResponceModel[];
  loadingIndicator = true;
  users: any;
  constructor(private router: Router, private apiService: ApiService) {}
  ngOnInit(): void {
   this.getUploadData()
  }

  

  ngAfterViewInit(): void {
    fromEvent(this.filterInput.nativeElement, 'keyup')
      .pipe(
        debounceTime(300),
        map((x: any) => x['target']['value'])
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


getUploadData(){
  this.apiService
  .postuploadDetails()
  .pipe()
  .subscribe({
    next: (response) => {
      if (response) {
        this.userData = this.tempArray = response.log;
        if (response.log) {
          response.log.forEach((element: any) => {
            if (element.date) {
              element.date = this.apiService.decryptionAES(
                element.date
              );
            }
            if (element.error) {
              element.error = this.apiService.decryptionAES(
                element.error
              );
            }
            if (element.filename) {
              element.filename = this.apiService.decryptionAES(
                element.filename
              );
            }
            if (element.row_no) {
              element.row_no = this.apiService.decryptionAES(
                element.row_no
              );
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
          (item?.filename &&
            item?.filename.toString().toLowerCase().indexOf(filterKey) !==
              -1) ||
          !filterKey
        ) {
          // found match, return true to add to result set
          return true;
        }
      }
    });
  }
}
