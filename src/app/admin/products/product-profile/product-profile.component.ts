import { Component, OnInit } from '@angular/core';
import { Product } from '../product.model';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/doctor/products/product.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { FormDialogComponent } from '../dialog/form-dialog/form-dialog.component';
import { UserService } from 'src/app/shared/security/user.service';
import { Rate } from 'src/app/shared/security/rate';
import { User } from 'src/app/shared/security/user';

@Component({
  selector: 'app-patient-profile',
  templateUrl: './product-profile.component.html',
  styleUrls: ['./product-profile.component.sass']
})
export class ProductProfileComponent implements OnInit {
  product: Product = new Product();
  productId: any;
  rate: Rate[]
  stars: boolean[] = Array(5).fill(false);
  user: User
  constructor(private productService: ProductService, private userService: UserService,private route: ActivatedRoute,private snackBar: MatSnackBar,public dialog: MatDialog) {
    this.productId=this.route.snapshot.paramMap.get('id');
    console.log(this.productId)
    this.getProduct(this.productId);
  }
  ngOnInit(): void {
  }
  getComments(id){
    this.userService.getOneUser(id).subscribe(
      data=>{
        this.rate =this.userService.getSellerComments(data.username)
        this.user = data
      }
    )
  }
  getProduct(id){
    this.productService.getOneProduct(id).subscribe(
      data=>{
        this.product = data;
        this.getComments(data.seller)
      }
      , error =>{
          console.log("Can't get Product")
      }
    );
  }

  editProduct(product) {
    const dialogRef = this.dialog.open(FormDialogComponent, {
      data: {
        product: product,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result === 1) {
        // After dialog is closed we're doing frontend updates
        // For add we're just pushing a new row inside DataService
        this.showNotification(
          'snackbar-success',
          'Order placed Successfully...!!!',
          'bottom',
          'center'
        );
      }
    });
  }

  showNotification(colorName, text, placementFrom, placementAlign) {
    this.snackBar.open(text, '', {
      duration: 2000,
      verticalPosition: placementFrom,
      horizontalPosition: placementAlign,
      panelClass: colorName,
    });
  }



}