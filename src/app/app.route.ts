import { LibraryComponent } from './library/library.component';

import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { ProfileComponent } from './profile/profile.component';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'profile', component: ProfileComponent },
  { path: 'library', component: LibraryComponent },
];
export const routing: ModuleWithProviders = RouterModule.forRoot(routes);
