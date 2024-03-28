import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-upload',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent {
  loading: boolean = false; // Flag variable
  file: any = null;

  constructor(
    private router: Router,
    private apiService: ApiService
  ) {}
  onChange(event: any) {
    this.file = event.target.files[0];
  }

  onUpload() {
    console.log(this.apiService.decryptionAES('U2FsdGVkX1+SYpjJ0VqCvHvSAdp1f+dbhw/JvvnWxrQa6CLWfGKy+7kW09uRrCQYQD8qBh0vP/gd1LgL/sB3IA=='));
    
    this.loading = !this.loading;
    if(this.file.size < 1000000){
    this.apiService.uploadasset(this.file).subscribe((result) => {
   
      Swal.fire({
        position: 'center',
        icon: result.status ? 'success' : 'error',
        title: this.apiService.decryptionAES(result.message),
        // confirmButtonText: result.status
        //   ? 'Proceed to Psychometric Question'
        //   : 'Proceed to next Application',
        showCloseButton: true,
      }).then((response) => {
        if (response.isConfirmed) {
          // if (result.status) {
          //   this.router.navigate(['/psychometric']);
          // } else {
          //   this.router.navigate(['/basic']);
          // }
          this.file =''
          setTimeout(() => {
            this.router.navigate(['pages/home']);
          }, 2000);
        }
      });
    });
  }else{
    alert('File size more than 1mb')
  }
  }
}
