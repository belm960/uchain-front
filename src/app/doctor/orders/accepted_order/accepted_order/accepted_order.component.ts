import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Order } from '../../order.model';
import { OrderService } from '../../../../admin/products copy/order.service';
import { TokenStorageService } from 'src/app/shared/security/token-storage.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-accepted_order',
  templateUrl: './accepted_order.component.html',
  styleUrls: ['./accepted_order.component.sass']
})
export class AcceptedOrderComponent implements OnInit {
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
          if(value.driver!=null && value.product[0].seller==id && value.status=='Pending'){
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
  orderDetail(id) {
    this.router.navigate([`/doctor/orders/order-profile/${id}`]);
  }
}
