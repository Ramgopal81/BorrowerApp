import { Route } from "@angular/router";
import { LoginComponent } from "./login/login.component";
import { ForgetPasswordComponent } from "../pages/forget-password/forget-password.component";

export default[
  {
    path:'login',
    component:LoginComponent
  },
  {
    path:'forget',
    component:ForgetPasswordComponent
  },
  {
    "path":"",
    redirectTo :"login",
    pathMatch:"full"
  }
] as Route[]