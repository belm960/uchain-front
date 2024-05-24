import { ProductProfileComponent } from './product-profile/product-profile.component';
import { EditProductComponent } from './edit-product/edit-product.component';
import { AddProductComponent } from './add-product/add-product.component';
import { ProductsComponent } from './my-products/products.component';
import { Page404Component } from '../../authentication/page404/page404.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'my-products',
    component: ProductsComponent,
  },
  {
    path: 'add-product',
    component: AddProductComponent,
  },
  {
    path: 'edit-product',
    component: EditProductComponent,
  },
  {
    path: 'product-profile',
    component: ProductProfileComponent,
  },
  { path: '**', component: Page404Component },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductsRoutingModule {}
