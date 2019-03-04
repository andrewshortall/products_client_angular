import { Routes } from '@angular/router';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { AuthGuard } from '@src/midgard/modules/oauth/auth.guard';
import { ProductsComponent } from '@clients/products/src/lib/products.component';
import { ProductDetailComponent } from '@clients/products/src/lib/pages/product-detail/product-detail.component';

const productsRoutes: Routes = [
  { path: '', component: ProductsComponent, canActivate: [AuthGuard]},
  { path: 'details/:id', component: ProductDetailComponent, canActivate: [AuthGuard]}
  ];

@NgModule({
  imports: [RouterModule.forChild(productsRoutes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule {}
