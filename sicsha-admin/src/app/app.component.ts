import {Component, OnInit} from '@angular/core';
import {menutype} from './app.menutype';
import {MainRepository} from './app.repository';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [MainRepository]
})
export class AppComponent implements OnInit{

  menuData = new menutype();
  centerList: string[];
  foodTimeList: string[];

  constructor(private repository: MainRepository) {

  }

  ngOnInit() {
    this.repository.getCenterList().then(value => {
      this.centerList = value;
    });

    this.foodTimeList = ["breakfast", "lunch", "dinner"];
  }
}

