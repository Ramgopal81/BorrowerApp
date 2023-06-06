// import { Injectable } from '@angular/core';

// import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { BehaviorSubject, Observable } from 'rxjs';
// import { Authorize, Detail } from '../models/dataModel';
// @Injectable({
//   providedIn: 'root'
// })
// export class BaseService {


//   constructor(private http: HttpClient) { }

//   postdtls(detail: Detail): Observable<any> {
//     return this.http.post('http://20.83.180.143:8080/applicant/borrower/findAllApplicant/v1', detail, {
//       headers: new HttpHeaders({
//         'Content-Type': 'application/json',
//       }),
    
//     });
  
//   }

//   postauthorize(authorize: Authorize): Observable<any> {
//     return this.http.post('http://20.83.180.143:8080/applicant/borrower/authorizeApplicant/v1', authorize, {
//       headers: new HttpHeaders({
//         'Content-Type': 'application/json',
//       }),
    
//     });
  
//   }
// }

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthorisationFormModel, Authorize, Detail } from '../models/dataModel';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private API_URL = environment.API_URL;
  constructor( private http: HttpClient) {}

  login(mobile:number,pin:number){
    return this.http.post<any>(`${this.API_URL}/user/loginPost/v1`,{mobile_no:mobile,password:pin})
  }


  postDetails(company_code: string): Observable<any> {
    return this.http.post<any>(`${this.API_URL}/applicant/borrower/findAllApplicant/v1`, {company_code:company_code}, {
              headers: new HttpHeaders({
                'Content-Type': 'application/json',
              }),
            
            });
  
  }

  getapplicantById(applicantId:string){
    return this.http.get<any>(`${this.API_URL}/applicant/getapplicantList/v1?applicant_id=${applicantId}`, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }),
      
      })
  }

  getapplicantLogin(mobile:any,mpin:any){
    return this.http.get<any>(`${this.API_URL}/applicant/getapplicantList/v1?${mobile},${mpin}`, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }),
      
      })
  }

    postauthorize(authorize: AuthorisationFormModel): Observable<any> {
    return this.http.post('http://20.83.180.143:8080/applicant/borrower/authorizeApplicant/v1', authorize, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    
    });
  
  }

}