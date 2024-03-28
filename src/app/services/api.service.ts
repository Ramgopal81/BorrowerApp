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
import { AddCompanyModel, AddUserModel, AdvanceSaveModel, AdvanceTrigger, AuthorisationFormModel, Authorize, Detail, DisburseModel, ForgetPass, MetaModel, ModifyUserModel, ResetPass, Update, UserDetail } from '../models/dataModel';
import { Observable } from 'rxjs';
import * as CryptoJS from 'crypto-js';


@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private API_URL = environment.API_URL;
  constructor( private http: HttpClient) {}

  
  appProperties = {
    VALUES: {
      KEY: '1234567890123456',
      IV: '8fdfdb7245c044279078ea1966a096fa',
    },
  };
  encryptionAES(encryptStr: any) {
    // Encrypt
    const ciphertext = CryptoJS.AES.encrypt(encryptStr, '1234567890123456');
    return ciphertext.toString();
  }
  decryptionAES(decryptStr: any) {
    // Decrypt
    const bytes = CryptoJS.AES.decrypt(decryptStr, '1234567890123456');
    const plaintext = bytes.toString(CryptoJS.enc.Utf8);
    return plaintext;
  }

  login(mobile:any,pin:any){
    return this.http.post<any>(`${this.API_URL}/user/loginPost/v1`,{mobile_no:mobile,password:pin})
  }

  postDetails(company_code: string): Observable<any> {
    return this.http.post<any>(`${this.API_URL}/applicant/borrower/findAllApplicant/v1`, {company_code:company_code}, {
              headers: new HttpHeaders({
                'Content-Type': 'application/json',
              }),
            
            });
  }

  postDashboard(company_code: string): Observable<any> {
    return this.http.post<any>(`${this.API_URL}/applicant/borrower/Dashboard`, {company_code:company_code}, {
              headers: new HttpHeaders({
                'Content-Type': 'application/json',
              }),
            
            });
  }
  postDelete(user_id: string): Observable<any> {
    return this.http.post<any>(`${this.API_URL}/user/delete_user`, {user_id:user_id}, {
              headers: new HttpHeaders({
                'Content-Type': 'application/json',
              }),
            
            });
  }

  postuserDetails(): Observable<any> {
    return this.http.post<any>(`${this.API_URL}/user/GetAllUsers`, {
              headers: new HttpHeaders({
                'Content-Type': 'application/json',
              }),
            
            });
  }
  postusersDetails(): Observable<any> {
    return this.http.post<any>(`${this.API_URL}/borrower/GetMkverifiedApplicant`, {
              headers: new HttpHeaders({
                'Content-Type': 'application/json',
              }),
            
            });
  }
  postcompanyDetails(): Observable<any> {
    return this.http.post<any>(`${this.API_URL}/user/GetAllCompany_name`, {
              headers: new HttpHeaders({
                'Content-Type': 'application/json',
              }),
            
            });
  }
  postuploadDetails(): Observable<any> {
    return this.http.post<any>(`${this.API_URL}/borrower/UploadApplicantsLog`, {
              headers: new HttpHeaders({
                'Content-Type': 'application/json',
              }),
            
            });
  }
  postcompanyName(company_id:string): Observable<any> {
    return this.http.post<any>(`${this.API_URL}/applicant/borrower/company/get_companyById`, {company_id:company_id},{
              headers: new HttpHeaders({
                'Content-Type': 'application/json',
              }),
            
            });
  }
  postDeleteCompany(company_id: string): Observable<any> {
    return this.http.post<any>(`${this.API_URL}/applicant/borrower/company/delete_company`, {company_id:company_id}, {
              headers: new HttpHeaders({
                'Content-Type': 'application/json',
              }),
            
            });
  }

  getapplicantById(applicantId:string|null){
    return this.http.get<any>(`${this.API_URL}/applicant/getapplicantList/v1?applicant_id=${applicantId}`, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }),
      
      })
  }
  getapplicantById1(applicant_id:string|null){
    return this.http.post<any>(`${this.API_URL}/applicant/GetApplicantListenc`,{applicant_id:applicant_id}, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }),
      
      })
  }
  getadvanceById(loan_id:string|null){
    return this.http.post<any>(`${this.API_URL}/borrower/getadvanceTriggerByLoan_id`,{loan_id:loan_id}, {
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

  getIfsc(ifsc:any){
    return this.http.get<any>(`https://ifsc.razorpay.com/?${ifsc}`, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }),
      
      })
  }

    postauthorize(authorize: AuthorisationFormModel): Observable<any> {
    return this.http.post('http://20.83.180.143:9080/applicant/borrower/authorizeApplicant/v1', authorize, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    
    });
  }

  postAdvanceDetail(advanceSave: AdvanceTrigger): Observable<any> {
    return this.http.post(`${this.API_URL}/borrower/SaveadvanceTrigger`, advanceSave, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    
    });
  }

  postUpdateApplicant(update: Update): Observable<any> {
    return this.http.post(`${this.API_URL}/applicant/modifyTruckersDetails/v1`, update, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    
    });
  }

  postAddUser(addUser: AddUserModel): Observable<any> {
    return this.http.post(`${this.API_URL}/user/add_modify_user`, addUser, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    
    });
  
  }
  postSaveAdvance(saveAdvance: AdvanceSaveModel): Observable<any> {
    return this.http.post(`${this.API_URL}/borrower/ApproveAdvanceLoanSH`, saveAdvance, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    
    });
  
  }
  postModifyUser(modifyUser: ModifyUserModel): Observable<any> {
    return this.http.post(`${this.API_URL}/user/add_modify_user`, modifyUser, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    
    });
  
  }

  postAddCompany(addCompany: AddCompanyModel): Observable<any> {
    return this.http.post(`${this.API_URL}/applicant/borrower/company/add_modify_company`, addCompany, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    
    });
  
  }

  postResetPass(resetPass: ResetPass): Observable<any> {
    return this.http.post(`${this.API_URL}/user/change_password`, resetPass, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    
    });
  
  }
  postForgetPass(forgetPass: ForgetPass): Observable<any> {
    return this.http.post(`${this.API_URL}/user/forgot_password1`, forgetPass, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    
    });
  
  }

  postUserDetail(userDetail: UserDetail): Observable<any> {
    return this.http.post(`${this.API_URL}/user/GetUserById`, userDetail, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    
    });
  }

  postDisburseDetail(disburseDetail: DisburseModel): Observable<any> {
    return this.http.post(`${this.API_URL}/borrower/SHDisbursemnt`, disburseDetail, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    
    });
  }

  postAdvanceDetails(): Observable<any> {
    return this.http.post<any>(`${this.API_URL}/borrower/getAlladvanceTrigger`, {
              headers: new HttpHeaders({
                'Content-Type': 'application/json',
              }),
            
            });
  }

  postAllLoanId(): Observable<any> {
    return this.http.post<any>(`${this.API_URL}/borrower/GetAllLoanId`, {
              headers: new HttpHeaders({
                'Content-Type': 'application/json',
              }),
            
            });
  }

  downloadCSV(): Observable<any> {
    return this.http.get(
      'http://20.83.180.143:9080/applicant/downloadTruckerscsv',
      {
        responseType: 'text',
      }
    );
  }


  postOpenUrl(metaModel: MetaModel): Observable<any> {
    return this.http.post<any>(`http://4.236.144.236:9567/meta`,metaModel,  {
              headers: new HttpHeaders({
                'Content-Type': 'application/json',
              }),
            
            });
  }

  baseApiURL1 = 'http://20.83.180.143:9080/borrower/uploadApplicantData';
  // reader = new FileReader();
  uploadasset(file: any): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    // let headers = new Headers();
    // headers.append('Content-Type', 'multipart/form-data');
    // headers.append('Accept', 'application/json');
    return this.http.post(this.baseApiURL1, formData, {});
  }

}