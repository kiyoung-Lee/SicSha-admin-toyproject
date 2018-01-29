import { Component, OnInit } from '@angular/core';
import {RegistMenuData} from "./model/page.menu.regist";
import {DateMenu} from "./model/menu.date";
import {MainRepository} from "./menu-regist.repository";
import {RestaurantMenu} from "./model/menu.restaurant";
import {ElementMenu} from "./model/menu.element";
import {BreakFastMenu} from "./model/menu.breakfast";
import {LunchMenu} from "./model/menu.lunch";
import {DinnerMenu} from "./model/menu.dinner";

@Component({
  selector: 'app-menu-regist',
  templateUrl: './menu-regist.component.html',
  styleUrls: ['./menu-regist.component.css'],
  providers: [MainRepository]
})
export class MenuRegistComponent implements OnInit {

  menuData = new RegistMenuData();
  sicshaList: DateMenu[];

  centerList: string[];
  foodTimeList: string[];

  constructor(private repository: MainRepository) {

  }

  ngOnInit() {
    this.pageDataInit();
  }

  pageDataInit(){
    this.repository.getCenterList().then(value => {
      this.centerList = value;
    });

    this.repository.getSicshaList().then(value => {
      this.sicshaList = value;
    })

    this.foodTimeList = ["breakfast", "lunch", "dinner"];


  }

  clickDateRegist($event){
    this.repository.registDate(this.dateList, "2018-01-15");
  }

  clickCenterRegist($event){

  }

  clickBtnRegist($event) {
    console.log(this.menuData.date)
    let body = JSON.stringify(this.menuData);
    console.log(body);
    let param = this.generateMenuData();

    this.repository.registMenu_temp(this.sicshaList.length, JSON.stringify(param));
  }

  generateMenuData(): DateMenu{
    let restaurant = new RestaurantMenu();
    restaurant.centerName = this.menuData.centerName;
    let time = this.menuData.time;

    if(time == "breakfast"){
      let breakfastMenu = new BreakFastMenu();
      breakfastMenu.breakfast = this.getElementMenuList();
      restaurant.menu = breakfastMenu;

    }else if(time == "lunch"){
      let lunchMenu = new LunchMenu();
      lunchMenu.lunch = this.getElementMenuList();
      restaurant.menu = lunchMenu;

    }else if(time == "dinner"){
      let dinnerMenu = new DinnerMenu();
      dinnerMenu.dinner = this.getElementMenuList();
      restaurant.menu = dinnerMenu;
    }

    return this.getRestaurant(restaurant);
  }

  getElementMenuList(): [ElementMenu]{
    let elementMenu = new ElementMenu();
    elementMenu.menuType = this.menuData.type;
    elementMenu.menuList = this.menuData.menu.split(",");

    let elementMenuList:[ElementMenu];
    elementMenuList = [elementMenu];

    return elementMenuList;
  }

  getRestaurant(restaurant: RestaurantMenu): DateMenu{
    let restaurantList: RestaurantMenu[] = [];
    restaurantList.push(restaurant);

    let inputMenu = new DateMenu();
    inputMenu.date = this.menuData.date
    inputMenu.rastaurant = restaurantList;

    return inputMenu;
  }

}
