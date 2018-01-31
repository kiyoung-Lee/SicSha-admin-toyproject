import { Component, OnInit } from '@angular/core';
import {RegistMenuData} from "./model/page.menu.regist";
import {SicshaDate} from "./model/menu.date";
import {MainRepository} from "./menu-regist.repository";
import {MatDatepickerInputEvent} from "@angular/material";
import moment = require("moment");


@Component({
  selector: 'app-menu-regist',
  templateUrl: './menu-regist.component.html',
  styleUrls: ['./menu-regist.component.css'],
  providers: [MainRepository]
})
export class MenuRegistComponent implements OnInit {
  inputRegistDate: string;
  inputRegistCenterDateIdx: number;
  inputRegistCenterName: string;
  menuData = new RegistMenuData();
  sicshaList: SicshaDate[];

  centerList: string[];
  foodTimeList: string[];

  constructor(public repository: MainRepository) {

  }

  ngOnInit() {
    this.pageDataInit();
  }

  pageDataInit(){

    this.repository.getSicshaList().then(value => {
      this.sicshaList = value;
    })

    this.foodTimeList = ["breakfast", "lunch", "dinner"];
  }

  registDatePickerChangeEvent(type: string, event: MatDatepickerInputEvent<Date>) {
    this.inputRegistDate = moment(event.value).format('YYYY-MM-DD');
    // this.inputRegistDate = `${event.value.getFullYear()}-${(event.value.getMonth() + 1)}-${event.value.getDate()}`;
  }

  clickDateRegist($event){
    this.repository.registDateAction(this.inputRegistDate);
  }

  clickCenterRegist($event){
    this.repository.registCenterAction(this.inputRegistCenterDateIdx, this.inputRegistCenterName);
  }

  clickBtnRegist($event) {
    console.log(this.menuData.date)
    let body = JSON.stringify(this.menuData);
    console.log(body);
  }

}
