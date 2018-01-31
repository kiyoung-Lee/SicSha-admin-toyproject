import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import { AngularFireDatabase } from 'angularfire2/database';
import {RestaurantMenu} from "./model/menu.restaurant";
import {CenterListName} from "./model/page.center.name";
import {SicshaDate} from "./model/menu.date";
import {RestaurantNameList} from "./model/menu.center.name";

@Injectable()
export class MainRepository{
  dateList: string[];
  centerList: CenterListName[];

  constructor(private http: Http, private db: AngularFireDatabase) {
    this.getDateList();

    this.getCenterList();
  }

  registDateAction(registDate: string){
    if(registDate == null) {
      alert("날짜를 입력 해주세요.")
    }else {
      if (this.dateList.some(x => x === registDate)) {
        alert("이미 등록된 날짜입니다.")
      } else {
        this.registDate(registDate);
      }
    }
  }

  registDate(registDate: string){
    let index: number = this.dateList.length;
    let addDate = new SicshaDate();
    addDate.date = registDate;

    this.db.database.ref('/dateList/' + index).set(registDate);
    this.db.database.ref('/sicsha/' + index).set(addDate);
    alert("날짜 등록 성공.");
  }

  registCenterAction(dateIdx: number, centerName: string){
    if(this.centerList[dateIdx] != null){
      let centerNameList = this.centerList[dateIdx].centerName;
      if(centerNameList.some(x => x === centerName)){
        alert("이미 등록된 센터 이름입니다.");
      }else{
        let nameIdx = centerNameList.length;
        this.db.database.ref('/centerList/' + dateIdx + '/centerName/' + nameIdx).set(centerName);

        this.db.database.ref('/sicsha/' + dateIdx + '/restaurant/' + nameIdx + '/centerName/').update({
          restaurant: centerName
        });

        alert("센터 등록 성공");
      }

    }else{
      let addCenterName = new CenterListName();
      let centerNameList = [centerName];
      addCenterName.centerName = centerNameList;

      let addRestaurant = new RestaurantNameList();
      addRestaurant.centerName = centerName;

      this.db.database.ref('/centerList/' + dateIdx).set({
        centerName:addCenterName
      });

      this.db.database.ref('/sicsha/' + dateIdx).update({
        restaurant: [addRestaurant]
      });

      alert("센터 등록 성공");
    }
  }

  registMenu(){

  }

  getDateList() {
    this.db.list<any>('dateList').valueChanges().subscribe(list => {
      this.dateList = list;
    });
  }

  getCenterList(){
    this.db.list<any>('centerList').valueChanges().subscribe(list => {
      this.centerList = list;
    });
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
