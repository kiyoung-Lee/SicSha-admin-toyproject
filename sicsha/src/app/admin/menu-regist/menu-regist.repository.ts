import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import { AngularFireDatabase } from 'angularfire2/database';
import {RestaurantMenu} from "./model/menu.restaurant";

@Injectable()
export class MainRepository{
  dateList: string[];

  constructor(private http: Http, private db: AngularFireDatabase) {
    this.getDateList();
  }

  registDate(dateList: string[], registDate: string){
    if(dateList.some(x => x === registDate)){
      alert("이미 등록된 날짜입니다.")
    }else{

    }
  }

  registCenter(dateIdx: number, centerName: string){
    this.db.database.ref('/sicsha/' + dateIdx + '/restaurant/').on('value', function (snapshot) {
      let restaurantList :RestaurantMenu[] = snapshot.val();
      if(restaurantList.some(x => x.centerName === centerName)){
        alert("이미 등록된 센터 이름입니다.");
      }else {

      }
    });
  }

  registMenu(){

  }

  getDateList(){
    this.db.database.ref('/dateList/').on('value', function (snapshot) {
      this.dateList = snapshot.val();
    });
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
