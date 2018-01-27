import { Component } from '@angular/core';
import {AuthService} from './auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';

  isLoggedIn;

  constructor(private router: Router, private authService: AuthService) {}

  routeChanged(){
    this.isLoggedIn = this.authService.isLoggedIn();
  }

  onLogout() {
    this.authService.logout().subscribe(data => {
      console.log("logout");
      localStorage.removeItem('quotesAngularToken');
      console.log(localStorage.getItem('quotesAngularToken'));

      this.router.navigateByUrl('/login');
    })
  }
}
