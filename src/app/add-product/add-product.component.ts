import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
  title!: string;
  imageUrl!: string;
  price!: number;
  description!: string;

  constructor(private apiServe: ApiService, private router: Router) { }
  word!: string;
  ngOnInit():void { 
  }

  onSubmit():void {    
    this.apiServe.addProduct({      
      title: this.title,
      imageUrl: this.imageUrl,
      price: this.price,
      description: this.description
      })
        .subscribe((response) => {
          this.word = response.word;
          this.router.navigate([response.route]);
          console.log(response);
        });
  }
}
