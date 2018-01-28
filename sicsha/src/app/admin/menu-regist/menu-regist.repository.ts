import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable()
export class MainRepository{

  constructor(private http: Http, private db: AngularFireDatabase) {

  }

  registDate(date: String){
    // this.db.database.ref('/sicsha/' + date).once('value').then(function(snapshot) {
    //   if(snapshot.val() != null){
    //     alert("이미 등록된 날짜입니다.");
    //   }else{
    //
    //   }
    // });
  }

  registCenter(){

  }

  registMenu(){

  }

  getDateList(dateList: string[]){
    this.db.database.ref('/dateList/').on('value', function (snapshot) {
      dateList = snapshot.val();
    })
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

  registMenu_temp(menuPage: number, param: any): Promise<any>{
    let url = "https://sicsha-7c1e2.firebaseio.com/sicsha/" + menuPage + ".json";
    const result = new Promise((resolve, reject) => {
      this.http.patch(url, param)
        .subscribe( response =>{

        });
    });
    return result;
  }

}
