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

  getSicshaList(): Promise<any>{
    const result = new Promise((resolve, reject) => {
      this.http.get('https://sicsha-7c1e2.firebaseio.com/sicsha.json')
        .subscribe(response => {
          var res = response.json();
          resolve(res);
        });
    });
    return result;
  }

  registMenu(menuPage: number, param: any): Promise<any>{
    let url = "https://sicsha-7c1e2.firebaseio.com/sicsha/" + menuPage + ".json";
    const result = new Promise((resolve, reject) => {
      this.http.patch(url, param)
        .subscribe( response =>{

        });
    });
    return result;
  }

}
