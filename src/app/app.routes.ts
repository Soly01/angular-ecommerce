import { Routes } from '@angular/router';
import { AuthGuard } from '../core/guards/Auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./components/auth/register/register.component').then(
        (c) => c.RegisterComponent
      ),
  },
  {
    path: 'complete-register/:id',
    loadComponent: () =>
      import(
        './components/auth/complete-register/complete-register.component'
      ).then((c) => c.CompleteRegisterComponent),
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./components/auth/login/login.component').then(
        (c) => c.LoginComponent
      ),
  },
  {
    path: 'home',
    loadComponent: () =>
      import('./components/home/home.component').then((c) => c.HomeComponent),
    canActivate: [AuthGuard],
  },
  {
    path: 'electronics',
    loadComponent: () =>
      import('./components/electronics/electronics.component').then(
        (c) => c.ElectronicsComponent
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'jeweleries',
    loadComponent: () =>
      import('./components/jeweleries/jeweleries.component').then(
        (c) => c.JeweleriesComponent
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'men',
    loadComponent: () =>
      import('./components/mens-clothes/mens-clothes.component').then(
        (c) => c.MensClothesComponent
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'women',
    loadComponent: () =>
      import('./components/women-clothes/women-clothes.component').then(
        (c) => c.WomenClothesComponent
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'all',
    loadComponent: () =>
      import('./components/all/all.component').then((c) => c.AllComponent),
    canActivate: [AuthGuard],
  },
  {
    path: 'profile',
    loadComponent: () =>
      import('./components/profile/profile.component').then(
        (c) => c.ProfileComponent
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'details/:id',
    loadComponent: () =>
      import('./components//details/details.component').then(
        (c) => c.DetailsComponent
      ),
  },
  {
    path: 'cart',
    loadComponent: () =>
      import('./components/cart/cart.component').then((c) => c.CartComponent),
    canActivate: [AuthGuard],
  },
  {
    path: 'settings',
    loadComponent: () =>
      import('./components/settings/settings.component').then(
        (c) => c.SettingsComponent
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'about',
    loadComponent: () =>
      import('./components/about/about.component').then(
        (c) => c.AboutComponent
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'contact',
    loadComponent: () =>
      import('./components/contact/contact.component').then(
        (c) => c.ContactComponent
      ),
    canActivate: [AuthGuard],
  },
];
