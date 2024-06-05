import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/doctor/products/product.model';
import { ProductService } from 'src/app/doctor/products/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.sass']
})
export class ProductComponent implements OnInit {
  products: Product[];

  constructor(private productService: ProductService,private router: Router) { this.getProduct()}

  ngOnInit(): void {
  }
  getProduct(){
    this.productService.getMyProduct().subscribe(
      data=>{
        this.products = data;
      }
      , error =>{
          console.log("Can't get Product")
      }
    );
  }
  productDetail(id) {
    this.router.navigate([`/admin/products/product-profile/${id}`]);
  }


}
