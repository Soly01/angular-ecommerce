import { Routes } from '@angular/router';

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
  },
  {
    path: 'electronics',
    loadComponent: () =>
      import('./components/electronics/electronics.component').then(
        (c) => c.ElectronicsComponent
      ),
  },
  {
    path: 'jeweleries',
    loadComponent: () =>
      import('./components/jeweleries/jeweleries.component').then(
        (c) => c.JeweleriesComponent
      ),
  },
  {
    path: 'men',
    loadComponent: () =>
      import('./components/mens-clothes/mens-clothes.component').then(
        (c) => c.MensClothesComponent
      ),
  },
  {
    path: 'women',
    loadComponent: () =>
      import('./components/women-clothes/women-clothes.component').then(
        (c) => c.WomenClothesComponent
      ),
  },
  {
    path: 'all',
    loadComponent: () =>
      import('./components/all/all.component').then((c) => c.AllComponent),
  },
  {
    path: 'profile',
    loadComponent: () =>
      import('./components/profile/profile.component').then(
        (c) => c.ProfileComponent
      ),
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
  },
  {
    path: 'settings',
    loadComponent: () =>
      import('./components/settings/settings.component').then(
        (c) => c.SettingsComponent
      ),
  },
  {
    path: 'about',
    loadComponent: () =>
      import('./components/about/about.component').then(
        (c) => c.AboutComponent
      ),
  },
  {
    path: 'contact',
    loadComponent: () =>
      import('./components/contact/contact.component').then(
        (c) => c.ContactComponent
      ),
  },
];
