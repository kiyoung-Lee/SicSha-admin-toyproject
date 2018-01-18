import {Injectable} from '@angular/core';
import {Http} from '@angular/http';

@Injectable()
export class MainRepository{

  constructor(private http: Http) {

  }

  getCenterList(): Promise<any>{
    const result = new Promise((resolve, reject) => {
      this.http.get('https://sicsha-7c1e2.firebaseio.com/centerList.json')
        .subscribe(response => {
          var res = response.json();
          resolve(res);
        });
    });
    return result;
  }
}
