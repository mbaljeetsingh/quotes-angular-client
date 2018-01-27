import { Component, OnInit } from '@angular/core';
import {DataService} from '../data.service';
import {environment} from '../../environments/environment';
import {AuthService} from '../auth.service';

@Component({
  selector: 'app-quotes',
  templateUrl: './quotes.component.html',
  styleUrls: ['./quotes.component.scss']
})
export class QuotesComponent implements OnInit {
  quotes;
  pageLength: number;
  pageSize = 5;

  isLoggedIn;

  constructor(private dataService: DataService, private authService: AuthService) {
    this.isLoggedIn = this.authService.isLoggedIn();
  }

  ngOnInit() {
    this.dataService.getData(`${environment.api_url}/api/Quotes/?filter[include]=author&filter[limit]=${this.pageSize}`).subscribe(data => {
      console.log(data);
      this.quotes = data;
    });

    this.dataService.getData(`${environment.api_url}/api/Quotes/count`).subscribe(data => {
      console.log(data);
      this.pageLength = data['count'];
    });
  }

  pageEvent(ev) {
    console.log(ev);
    const pageIndex = ev.pageIndex;
    const pageSize = ev.pageSize;
    const skip = pageIndex * pageSize;
    this.dataService.getData(`${environment.api_url}/api/Quotes/?filter[include]=author&filter[limit]=${pageSize}&filter[skip]=${skip}`).subscribe(data => {
      console.log(data);
      this.quotes = data;
    });
  }

  deleteQuote(id, index) {
    this.dataService.deleteData(`${environment.api_url}/api/Quotes/${id}`).subscribe(data => {
      console.log(data);
      this.quotes.splice(index, 1);
    });
  }
}
