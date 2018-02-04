import { Component, OnInit } from '@angular/core';
import {RegistMenuData} from "./model/page.menu.regist";
import {SicshaDate} from "./model/menu.date";
import {MainRepository} from "./menu-regist.repository";
import {MatDatepickerInputEvent, MatSelectChange} from "@angular/material";
import moment = require("moment");
import {FormControl} from '@angular/forms';


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

  foodTimeList: string[];
  menuTypeList: string[];
  selectDate = new FormControl();

  constructor(public repository: MainRepository) {
    console.log(this.selectDate);
  }

  ngOnInit() {
    this.pageDataInit();
  }

  pageDataInit(){

    this.repository.getSicshaList().then(value => {
      this.sicshaList = value;
    })

    this.foodTimeList = ["breakfast", "lunch", "dinner"];
    this.menuTypeList = ["한식", "중식", "일식", "양식", "특식" ];
  }

  registDatePickerChangeEvent(type: string, event: MatDatepickerInputEvent<Date>) {
    this.inputRegistDate = moment(event.value).format('YYYY-MM-DD');
  }

  clickDateRegist($event){
    this.repository.registDateAction(this.inputRegistDate);
  }

  clickCenterRegist($event){
    this.repository.registCenterAction(this.inputRegistCenterDateIdx, this.inputRegistCenterName);
  }

  setMenuRegistDate($event, idx){
    console.log("dateChange" + this.menuData.date);
    this.repository.setCenterNameByDate(this.menuData.date);
  }

  clickBtnRegist($event) {
    console.log(this.menuData.date)
    let body = JSON.stringify(this.menuData);
    console.log(body);
  }

}
