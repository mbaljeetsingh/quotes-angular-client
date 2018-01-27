import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable()
export class DataService {

  constructor(private http: HttpClient) { }

  getData(url) {
    return this.http.get(url);
  }

  postData(url, data) {
    console.log(url, data);

    const headers = new HttpHeaders({
      'Content-type' : 'application/json'
    });

    return this.http.post(url, data, {headers: headers});
  }

  updateData(url, data) {
    console.log(url, data);

    const headers = new HttpHeaders({
      'Content-type' : 'application/json'
    });

    return this.http.put(url, data, {headers: headers});
  }

  deleteData(url) {
    return this.http.delete(url);
  }
}
