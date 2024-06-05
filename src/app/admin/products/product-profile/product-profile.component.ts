import { Component, OnInit } from '@angular/core';
import { Product } from '../product.model';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/doctor/products/product.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { FormDialogComponent } from '../dialog/form-dialog/form-dialog.component';

@Component({
  selector: 'app-patient-profile',
  templateUrl: './product-profile.component.html',
  styleUrls: ['./product-profile.component.sass']
})
export class ProductProfileComponent implements OnInit {
  product: Product = new Product();
  productId: any;
  constructor(private productService: ProductService, private route: ActivatedRoute,private snackBar: MatSnackBar,public dialog: MatDialog) {
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