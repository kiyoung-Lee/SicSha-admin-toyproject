import {Component, OnInit} from '@angular/core';
import {menutype} from './Data/app.menutype';
import {MainRepository} from './app.repository';
import {ElementMenu} from "./Data/ElementMenu";
import {DateMenu} from "./Data/DateMenu";
import {RestaurantMenu} from "./Data/RestaurantMenu";
import {BreakFastMenu} from "./Data/BreakFastMenu";
import {LunchMenu} from "./Data/LunchMenu";
import {DinnerMenu} from "./Data/DinnerMenu";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [MainRepository],
})
export class AppComponent implements OnInit{

  menuData = new menutype();
  sicshaList: DateMenu[];
  centerList: string[];
  foodTimeList: string[];

  constructor(private repository: MainRepository) {

  }

  ngOnInit() {
    this.repository.getCenterList().then(value => {
      this.centerList = value;
    });

    this.repository.getSicshaList().then(value => {
      this.sicshaList = value;
    })

    this.foodTimeList = ["breakfast", "lunch", "dinner"];
  }

  clickBtnRegist($event) {
    console.log(this.menuData.date)
    let body = JSON.stringify(this.menuData);
    console.log(body);
    let param = this.generateMenuData();

    this.repository.registMenu(this.sicshaList.length, JSON.stringify(param));
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

