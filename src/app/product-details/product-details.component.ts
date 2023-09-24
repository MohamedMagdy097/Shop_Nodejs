import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements  OnInit {
  constructor(private route:ActivatedRoute, private apiServe: ApiService) { }
  product: any;
  imageUrl!: string;
  ngOnInit(): void {
    let id = this.route.snapshot.paramMap.get('id');
    this.apiServe.getDetails(id).subscribe({
      next: (response) => {
        this.product = response;
        this.imageUrl = response.imageUrl;
      }
    });
  }
}
