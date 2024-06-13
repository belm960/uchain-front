import { Component, OnInit } from '@angular/core';
import { Order } from '../../order.model';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { FormDialogComponent } from '../../dialog/form-dialog/form-dialog.component';
import { OrderService } from '../../../../admin/products copy/order.service';
import { Rate } from 'src/app/shared/security/rate';
import { UserService } from 'src/app/shared/security/user.service';

@Component({
  selector: 'app-order-profile',
  templateUrl: './accepted_order-profile.component.html',
  styleUrls: ['./accepted_order-profile.component.sass']
})
export class AcceptedOrderProfileComponent implements OnInit {
  order: Order = new Order();
  orderId: any;
  rate: Rate[]
  stars: boolean[] = Array(5).fill(false)
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
        this.rate =this.userService.getSellerComments(data.username);
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
  editOrder(order) {
    const dialogRef = this.dialog.open(FormDialogComponent, {
      data: {
        order: order,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result === 1) {
        // After dialog is closed we're doing frontend updates
        // For add we're just pushing a new row inside DataService
        this.showNotification(
          'snackbar-success',
          'Order edited Successfully...!!!',
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