import { Route } from "@angular/router";
import { HeaderComponent } from "./header/header.component";
import { HomeComponent } from "./home/home.component";

import { PagesComponent } from "./pages.component";
import { BorrowerDetailComponent } from "./home/borrower-detail/borrower-detail.component";



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
       

    ],
  },
];