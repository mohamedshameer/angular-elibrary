import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SearchFilterPipe } from './library/searchfilter.pipe';

import { LibraryComponent } from './library/library.component';
import { HomeComponent } from './home/home.component';
import { routing } from './app.route';
import { AppComponent } from './app.component';
import { ProfileComponent } from './profile/profile.component';
import { HttpModule } from '@angular/http';

@NgModule({
  declarations: [
    AppComponent,
    ProfileComponent,
    HomeComponent,
    LibraryComponent,
    SearchFilterPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
 }
