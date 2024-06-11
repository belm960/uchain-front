import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Order } from '../../order.model';
import { TokenStorageService } from 'src/app/shared/security/token-storage.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { OrderService } from 'src/app/admin/products copy/order.service';

@Component({
  selector: 'app-shipped_order',
  templateUrl: './shipped_order.component.html',
  styleUrls: ['./shipped_order.component.sass']
})
export class ShippedOrderComponent implements OnInit {
  orders: Order[] = []

  constructor(private orderService: OrderService,private router: Router, private tokenStorage: TokenStorageService, private snackBar: MatSnackBar,public dialog: MatDialog) { this.getOrder()}

  ngOnInit(): void {
  }
  getOrder(){
    const id = parseInt(this.tokenStorage.getId())
    this.orders = []
    this.orderService.getMyOrder().subscribe(
      data=>{
        data.forEach((value)=>{
          if(value.driver!=null && value.product[0].seller==id && value.status=='Shipped'){
            this.orders.push(value)
            }
          }
        );
      }
      , error =>{
          console.log("Can't get Product")
      }
    );
  }
  showNotification(colorName, text, placementFrom, placementAlign) {
    this.snackBar.open(text, '', {
      duration: 2000,
      verticalPosition: placementFrom,
      horizontalPosition: placementAlign,
      panelClass: colorName,
    });
  }
  orderDetail(id) {
    this.router.navigate([`/doctor/orders/shipped_order_profile/${id}`]);
  }
}
