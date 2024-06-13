import { Component, OnInit } from '@angular/core';
import { Order } from '../../order.model';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { OrderService } from 'src/app/admin/products copy/order.service';
import { UserService } from 'src/app/shared/security/user.service';
import { Rate } from 'src/app/shared/security/rate';

@Component({
  selector: 'app-delivered_order-profile',
  templateUrl: './delivered_order-profile.component.html',
  styleUrls: ['./delivered_order-profile.component.sass']
})
export class DeliveredOrderProfileComponent implements OnInit {
  order: Order = new Order();
  orderId: any;
  rate: Rate[]
  stars: boolean[] = Array(5).fill(false);
  constructor(private orderService: OrderService,private userService: UserService, private route: ActivatedRoute,private snackBar: MatSnackBar,public dialog: MatDialog) {
    this.orderId=this.route.snapshot.paramMap.get('id');
    console.log(this.orderId)
    this.getOrder(this.orderId);
  }
  ngOnInit(): void {
  }
  getComments(id){
    this.userService.getOneUser(id).subscribe(
      data=>{
        this.rate =this.userService.getSellerComments(data.username)
      }
    )
  }
  getOrder(id){
    this.orderService.getOneOrder(id).subscribe(
      data=>{
          this.order = data;
          this.getComments(data.product[0].seller)
        }
      , error =>{
          console.log("Can't get Order")
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
}