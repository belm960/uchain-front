import { Component, OnInit } from '@angular/core';
import { Order } from '../../order.model';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { OrderService } from 'src/app/admin/products copy/order.service';
import { UserService } from 'src/app/shared/security/user.service';
import { Rate } from 'src/app/shared/security/rate';
import { User } from 'src/app/shared/security/user';
import Swal from 'sweetalert2';
import { delay } from 'rxjs/operators';
import { MessageService } from 'src/app/shared/security/message_service';

@Component({
  selector: 'app-shipped_order-profile',
  templateUrl: './shipped_order-profile.component.html',
  styleUrls: ['./shipped_order-profile.component.sass']
})
export class ShippedOrderProfileComponent implements OnInit {
  order: Order = new Order();
  orderId: any;
  rate: Rate[]
  stars: boolean[] = Array(5).fill(false);
  buyer: User = new User()
  driver: User = new User()
  constructor(private router:Router, private messageService:MessageService,private orderService: OrderService,private userService: UserService, private route: ActivatedRoute,private snackBar: MatSnackBar,public dialog: MatDialog) {
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
  getBuyer(id){
    this.userService.getOneUser(id).subscribe(
      data=>{
        this.buyer = data
        if(this.buyer.profile_image.includes("127.0.0.1:8000")){
          this.buyer.profile_image = this.buyer.profile_image.substring(21)
        }
      },
      _=>{
        console.log("error here")
      }
    )
  }
  getDriver(id){
    this.userService.getOneUser(id).subscribe(
      data=>{
        this.driver = data
        if(this.driver.profile_image.includes("127.0.0.1:8000")){
          this.driver.profile_image = this.driver.profile_image.substring(21)
        }
      },
      _=>{
        console.log("error here")
      }
    )
  }
  getOrder(id){
    this.orderService.getOneOrder(id).subscribe(
      data=>{
          this.order = data;
          this.getComments(data.product[0].seller)
          this.getBuyer(data.buyer)
          this.getDriver(data.driver)
          if(data.product[0].image.includes("127.0.0.1:8000")){
            data.product[0].image = data.product[0].image.substring(21)
          }
        }
      , error =>{
          console.log("Can't get Order")
      }
    );
  }
  goToChat(username:string) {
    Swal.fire({
      title: 'Are you sure?',
      text: "Want Say Hello!",
      icon: 'success',
      showCancelButton: true,
      confirmButtonColor: '#00ff00',
      cancelButtonColor: '#0f0',
      confirmButtonText: 'Say Hello!'
    }).then(result => {
      if (result.value) {
        const data = {
          "receiver": username,
          "content": "Hello"
        }
        this.messageService.sendMessage(data).subscribe(
          data=>{
            Swal.fire('Sent!', 'You have sayed Hello to. ' + username, 'success');
            delay(2000)
            this.router.navigate([`/apps/chat`]);
          }
        )
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