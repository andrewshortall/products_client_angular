import { NgModule } from '@angular/core';
import { ProductsComponent } from './products.component';
import { ProductsRoutingModule } from '@clients/products/src/lib/products-routing.module';
import { MidgardCrudModule } from '@src/midgard/modules/crud/crud.module';
import { ProductDetailComponent } from './pages/product-detail/product-detail.component';
import { MatButtonModule, MatIconModule } from '@angular/material';
import { MidgardFormModule } from '@src/midgard/modules/form/form.module';

@NgModule({
  imports: [
    MidgardCrudModule,
    MidgardFormModule,
    ProductsRoutingModule,
    MatButtonModule,
    MatIconModule
  ],
  declarations: [ProductsComponent, ProductDetailComponent],
  exports: [ProductsComponent]
})
export class ProductsModule { }
