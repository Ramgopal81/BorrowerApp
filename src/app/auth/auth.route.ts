import { Route } from "@angular/router";
import { LoginComponent } from "./login/login.component";

export default[
  {
    path:'login',
    component:LoginComponent
  },
  {
    "path":"",
    redirectTo :"login",
    pathMatch:"full"
  }
] as Route[]