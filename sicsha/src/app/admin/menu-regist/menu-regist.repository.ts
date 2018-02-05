import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import { AngularFireDatabase } from 'angularfire2/database';
import {CenterListName} from "./model/page.center.name";
import {SicshaDate} from "./model/menu.date";
import {RestaurantNameList} from "./model/menu.center.name";
import {RegistMenuData} from "./model/page.menu.regist";

@Injectable()
export class MainRepository{
  dateList: string[];
  centerList: CenterListName[];
  dateCenterList: string[];
  menuPackage:any;
  menuTypeList: any;

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
    this.db.database.ref('/centerList/' + index + /centerName/).set("");
    this.db.database.ref('/sicsha/' + index).set(addDate);
    alert("날짜 등록 성공.");
  }

  registCenterAction(dateIdx: number, centerName: string){
    if(this.centerList[dateIdx] != null){

      let centerNameList:string[] = this.centerList[dateIdx].centerName;
      if(this.isCenterNameContains(centerNameList, centerName)){
        alert("이미 등록된 센터 이름입니다.");
      }else{
        let nameIdx = centerNameList.length;
        this.db.database.ref('/centerList/' + dateIdx + '/centerName/' + nameIdx).set(centerName);

        this.db.database.ref('/sicsha/' + dateIdx + '/restaurant/' + nameIdx).update({
          centerName: centerName
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

  isCenterNameContains(centerNameList:string[], centerName:string){
    let isContains = false;
    for (let idx in centerNameList){
      if(centerNameList[idx] === centerName){
        isContains = true;
      }
    }

    return isContains;
  }

  setCenterNameByDate(dateIdx: number){
    this.dateCenterList = [];
    this.dateCenterList = this.centerList[dateIdx].centerName;
  }

  registMenu(menuData: RegistMenuData){
    let menuList = menuData.menu.split(",");

    if(this.menuPackage.length != 0){
      if(this.menuTypeList.length != 0){
        this.db.database.ref('/sicsha/' + menuData.date + '/restaurant/' + menuData.centerName + '/menu/' + menuData.time + '/' + this.menuTypeList.length + '/').update({
          menutype:menuData.type,
          menuList:menuList
        });
        alert("메뉴 등록 성공");
        return;
      }
    }

    this.db.database.ref('/sicsha/' + menuData.date + '/restaurant/' + menuData.centerName + '/menu/' + menuData.time + '/0/').update({
      menutype:menuData.type,
      menuList:menuList
    });

    alert("메뉴 등록 성공");
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

  getMenuPackage(menuData: RegistMenuData){
    this.db.list<any>('/sicsha/' + menuData.date + '/restaurant/' + menuData.centerName + /menu/).valueChanges().subscribe(list => {
      this.menuPackage = list;
    });

    this.db.list<any>('/sicsha/' + menuData.date + '/restaurant/' + menuData.centerName + '/menu/' + menuData.time).valueChanges().subscribe(list => {
      this.menuTypeList = list;
    });
  }

}
