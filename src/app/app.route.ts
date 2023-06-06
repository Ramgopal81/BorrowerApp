import { Route } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { PagesComponent } from './pages/pages.component';
import { AuthGuard } from './core/guard/auth.guard';

export const APP_ROUTE: Route[] = [

  {
    path:'auth',
    loadChildren: () => import('./auth/auth.route')
    },
    {
      path: 'pages',
      loadChildren: () => import('./pages/pages.route').then( m => m.PAGES_ROUTE)
    },
    {
      path: '',
      // canActivate:[AuthGuard],
      loadChildren: () => import('./pages/pages.route').then( m => m.PAGES_ROUTE)


    },
];