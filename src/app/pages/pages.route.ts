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
      

    ],
  },
];