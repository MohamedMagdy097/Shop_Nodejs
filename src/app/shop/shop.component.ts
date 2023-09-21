import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit{
  currentRoute: string = '';

  constructor() { }
  ngOnInit(): void {
    // this.currentRoute = this.routeService.getCurrentRoute();
    // console.log(this.currentRoute);
  }
}
