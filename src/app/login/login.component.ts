import { Component, OnInit } from '@angular/core';
import {AuthService} from '../auth.service';
import {QuotesComponent} from '../quotes/quotes.component';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  email;
  password;

  constructor(private router: Router, private authService: AuthService) {
    if(authService.isLoggedIn()) {
      this.router.navigate([QuotesComponent]);
    }
  }

  ngOnInit() {
  }

  login() {
      const postData = {
        email: this.email,
        password: this.password
      }

      this.authService.login(postData).subscribe(data => {
        console.log(data);
        localStorage.setItem('quotesAngularToken', JSON.stringify(data));
        this.router.navigate([QuotesComponent]);
      })
  }

}
