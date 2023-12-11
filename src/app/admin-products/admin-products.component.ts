import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
import { PageEvent } from '@angular/material/paginator';


@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit {
  imagePath: string = 'https://image.tmdb.org/t/p/w500';
  allMovies: any[] = [];
  allData: any[] = [];
  lang: string = 'en-US';

  path:string ="../../assets/";
  //late
  totalmovies!: number;
  m:number=100;

  allProducts: any;
  deleteDialog: boolean = false;

  moviesPerPage: number = 21;

  private searchval: string = '';
  showMoviesDetails: boolean = true;

  currentPage: number = 1;

  constructor(private apiServe: ApiService, private router: Router) {
    // this.apiServe.getProducts().subscribe((data: any) => {
    //   this.allProducts = data;
    // })
    this.apiServe.getAllMovies(this.currentPage, this.moviesPerPage).subscribe((data: any) => {
      this.allProducts = data.products;
      this.totalmovies = data.totalProducts;
    });
   }
  ngOnInit(): void {
    this.apiServe.getAllMovies(this.currentPage, this.moviesPerPage).subscribe((data: any) => {
      this.allProducts = data.products;
      this.totalmovies = data.totalProducts;
    });
  }
  
  delete(id: string) {
    this.apiServe.deleteProduct(id).subscribe((response: any) => {
      console.log(response);
      if (response.route && this.router.url !== response.route) {
        this.toggleDialog();
        this.router.navigate([response.route]);
        this.apiServe.getProducts().subscribe((data: any) => {
          this.allProducts = data;
        });
      }
    });
  }

  
  toggleDialog() {
    this.deleteDialog = !this.deleteDialog;
  }

  changePage(pageData:PageEvent){
    this.currentPage=pageData.pageIndex+1;
    this.moviesPerPage=pageData.pageSize;    
    this.apiServe.getAllMovies(this.currentPage,this.moviesPerPage).subscribe({
      next: (data) => {
        // console.log(data);
        this.allProducts = data.products;
        this.totalmovies=data.totalProducts;
      },
    });

  }
}
