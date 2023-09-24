import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit{
  allProducts: any;

  constructor(private apiServe: ApiService) { }
  ngOnInit(): void {
    this.apiServe.getProducts().subscribe((data: any) => {
      this.allProducts = data;
    })
  }

  showMovieDetails:Boolean = false;
    
  toggleDetails(movieId: any) {
      for (const item of this.allProducts) {
          if(item._id == movieId) {
              item.showMovieDetails =! item.showMovieDetails;
          }
      }
  }
}
