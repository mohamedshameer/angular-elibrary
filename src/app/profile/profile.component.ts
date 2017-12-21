import { OnInit } from '@angular/core';
import { CookieService } from 'angular2-cookie/core';
import { Component } from '@angular/core';

@Component({
  selector: 'profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  profile: any;

  constructor(private _cookieService: CookieService) { }
  ngOnInit() {
     var data = this._cookieService.get('profile');
     this.profile = JSON.parse(data);
    console.log(this.profile);
  }

}
