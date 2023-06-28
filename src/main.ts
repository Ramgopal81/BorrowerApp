

import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { AppComponent } from './app/app.component';
import { APP_ROUTE } from './app/app.route';
import { BrowserAnimationsModule, provideAnimations } from '@angular/platform-browser/animations';
import { importProvidersFrom } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthGuard } from './app/core/guard/auth.guard';
import { AuthInterceptor } from './app/interceptors/auth.interceptor';
import { provideToastr } from 'ngx-toastr';

  bootstrapApplication(AppComponent,{
    providers:[
    provideRouter(APP_ROUTE),
    AuthGuard,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    provideAnimations(),
    provideToastr(),
    importProvidersFrom(BrowserAnimationsModule, HttpClientModule),
    provideAnimations()
]
  })