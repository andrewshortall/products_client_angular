import { Routes } from '@angular/router';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { AuthGuard } from '@libs/midgard-angular/src/lib/modules/oauth/auth.guard';
import { ProductsComponent } from '@libs/products/src/lib/products.component';

const productsRoutes: Routes = [
  { path: '', component: ProductsComponent, canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forChild(productsRoutes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule {}

