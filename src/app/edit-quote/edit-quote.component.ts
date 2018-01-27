import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import 'rxjs/add/operator/map';
import {DataService} from '../data.service';
import {environment} from '../../environments/environment';
import {QuotesComponent} from '../quotes/quotes.component';

@Component({
  selector: 'app-edit-quote',
  templateUrl: './edit-quote.component.html',
  styleUrls: ['./edit-quote.component.scss']
})
export class EditQuoteComponent implements OnInit {
  id;
  authors;

  content;
  authorId;


  constructor(private router: Router, private route: ActivatedRoute, private dataService: DataService) {
    this.route.params.subscribe(data => {
      //console.log(data);
      this.id = data.id;
    })
  }

  ngOnInit() {
    this.dataService.getData(`${environment.api_url}/api/quotes/${this.id}`).subscribe(data => {
      console.log(data);
      this.content = data['content'];
      this.authorId = data['authorId'];
    });
    this.dataService.getData(`${environment.api_url}/api/authors`).subscribe(data => {
      console.log(data);
      this.authors = data;
    })
  }

  updateQuote() {
    const editData = {
      content: this.content,
      authorId: this.authorId
    };

    this.dataService.updateData(`${environment.api_url}/api/quotes/${this.id}`, editData).subscribe(data => {
      console.log(data);
      this.router.navigate([QuotesComponent]);
    });
  }

}
