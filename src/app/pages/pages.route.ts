import { Route } from "@angular/router";
import { HeaderComponent } from "./header/header.component";
import { HomeComponent } from "./home/home.component";

import { PagesComponent } from "./pages.component";
import { BorrowerDetailComponent } from "./home/borrower-detail/borrower-detail.component";
import { UsersComponent } from "./users/users.component";
import { CreateUserComponent } from "./users/create-user/create-user.component";
import { ModifyUserComponent } from "./users/modify-user/modify-user.component";
import { DeleteUserComponent } from "./users/delete-user/delete-user.component";
import { ResetComponent } from "./reset/reset.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { CompanydetailComponent } from "./companydetail/companydetail.component";
import { AddcompanyComponent } from "./addcompany/addcompany.component";
import { ModifycompanyComponent } from "./modifycompany/modifycompany.component";
import { AdvanceComponent } from "./advance/advance.component";
import { OptionComponent } from "./option/option.component";
import { TriggerdetailComponent } from "./triggerdetail/triggerdetail.component";
import { UpdateComponent } from "./update/update.component";
import { AdvanceDetailComponent } from "./advance-detail/advance-detail.component";
import { UploadComponent } from "./upload/upload.component";
import { DisburseComponent } from "./disburse/disburse.component";


export const PAGES_ROUTE: Route[] = [

  {
    path: '',
    component: PagesComponent,
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
      {
          "path":"home",
          component:HomeComponent
        },
        {
          "path":"header",
          component:HeaderComponent
        },
        {
          "path":"borrowerDetails",
          component:BorrowerDetailComponent
        },
        {
          "path":"users",
          component:UsersComponent
        },
        {
          "path":"createUser",
          component:CreateUserComponent
        },
        {
          "path":"modifyUser",
          component:ModifyUserComponent
        },
        {
          "path":"deleteUser",
          component:DeleteUserComponent
        },
        {
          "path":"reset",
          component:ResetComponent
        },
        {
          "path":"dashboard",
          component:DashboardComponent
        },
        {
          "path":"companyDetail",
          component:CompanydetailComponent
        },
        {
          "path":"addCompany",
          component:AddcompanyComponent
        },
        {
          "path":"modifyCompany",
          component:ModifycompanyComponent
        },
        {
          "path":"advance",
          component:AdvanceComponent
        },
        {
          "path":"option",
          component:OptionComponent
        },
        {
          "path":"triggerDetail",
          component:TriggerdetailComponent
        },
        {
          "path":"update",
          component:UpdateComponent
        },
        {
          "path":"advanceDetail",
          component:AdvanceDetailComponent
        },
        {
          "path":"upload",
          component:UploadComponent
        },
        {
          "path":"disburse",
          component:DisburseComponent
        },

    ],
  },
];