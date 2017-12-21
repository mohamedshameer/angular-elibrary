import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MdlModule } from 'angular2-mdl';
import { MdlSelectModule } from '@angular2-mdl-ext/select';
import { CookieService } from 'angular2-cookie/services/cookies.service'
import { CategoryFilterPipe } from './library/category.pipe';

import { SortBooksPipe } from './library/sort.pipe';
import { SearchFilterPipe } from './library/searchfilter.pipe';
import { LibraryComponent } from './library/library.component';
import { HomeComponent } from './home/home.component';
import { routing } from './app.route';
import { AppComponent } from './app.component';
import { ProfileComponent } from './profile/profile.component';

@NgModule({
  declarations: [
    AppComponent,
    ProfileComponent,
    HomeComponent,
    LibraryComponent,
    SearchFilterPipe,
    SortBooksPipe,
    CategoryFilterPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing,
    MdlModule,
    MdlSelectModule,
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule {
 }
