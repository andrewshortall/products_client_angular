import { NgModule } from '@angular/core';
import { ProductsComponent } from './products.component';
import { ProductsRoutingModule } from '@libs/products/src/lib/products-routing.module';

@NgModule({
  imports: [
    ProductsRoutingModule
  ],
  declarations: [ProductsComponent],
  exports: [ProductsComponent]
})
export class ProductsModule { }
