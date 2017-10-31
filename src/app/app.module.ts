import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MdlModule } from 'angular2-mdl';
import { SortBooksPipe } from './library/sort.pipe';
import { SearchFilterPipe } from './library/searchfilter.pipe';
import { LibraryComponent } from './library/library.component';
import { HomeComponent } from './home/home.component';
import { routing } from './app.route';
import { AppComponent } from './app.component';
import { ProfileComponent } from './profile/profile.component';
import { MdlSelectModule } from '@angular2-mdl-ext/select';

@NgModule({
  declarations: [
    AppComponent,
    ProfileComponent,
    HomeComponent,
    LibraryComponent,
    SearchFilterPipe,
    SortBooksPipe,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing,
    MdlModule,
    MdlSelectModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
 }
