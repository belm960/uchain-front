import { OrderProfileComponent } from './order-profile/order-profile.component';
import { Page404Component } from '../../authentication/page404/page404.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrderComponent } from './order/order.component';
import { AcceptedOrderComponent } from './accepted_order/accepted_order/accepted_order.component';
import { AcceptedOrderProfileComponent } from './accepted_order/accepted_order_profile/accepted_order-profile.component';

const routes: Routes = [
  {
    path: 'order',
    component: OrderComponent,
  },
  {
    path: 'accepted_order',
    component: AcceptedOrderComponent,
  },
  {
    path: 'accepted_order_profile/:id',
    component: AcceptedOrderProfileComponent,
  },
  {
    path: 'order-profile/:id',
    component: OrderProfileComponent,
  },
  { path: '**', component: Page404Component },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrderRoutingModule {}
