import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Order } from '../order.model';
import { OrderService } from '../order.service';
import { TokenStorageService } from 'src/app/shared/security/token-storage.service';


@Component({
  selector: 'app-product',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.sass']
})
export class OrderComponent implements OnInit {
  orders: Order[] = [];

  constructor(private orderService: OrderService,private router: Router, private tokenStorage: TokenStorageService) { this.getOrder()}

  ngOnInit(): void {
  }
  getOrder(){
    const id = parseInt(this.tokenStorage.getId());
    this.orderService.getMyOrder().subscribe(
      data=>{
        data.forEach((value)=>{
          if(value.buyer==id){
            this.orders.push(value);
          }
        });
      }
      , error =>{
          console.log("Can't get Product")
      }
    );
  }
  orderDetail(id) {
    this.router.navigate([`/admin/orders/order-profile/${id}`]);
  }


}
