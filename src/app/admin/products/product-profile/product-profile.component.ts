import { Component, OnInit } from '@angular/core';
import { Product } from '../product.model';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/doctor/products/product.service';

@Component({
  selector: 'app-patient-profile',
  templateUrl: './product-profile.component.html',
  styleUrls: ['./product-profile.component.sass']
})
export class ProductProfileComponent implements OnInit {
  product: Product = new Product();
  productId: any;
  constructor(private productService: ProductService, private route: ActivatedRoute) {
    this.productId=this.route.snapshot.paramMap.get('id');
    console.log(this.productId)
    this.getProduct(this.productId);
  }
  ngOnInit(): void {
  }
  getProduct(id){
    this.productService.getOneProduct(id).subscribe(
      data=>{
        this.product = data;
      }
      , error =>{
          console.log("Can't get Product")
      }
    );
  }


}