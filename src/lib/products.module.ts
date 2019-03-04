import { NgModule } from '@angular/core';
import { ProductsComponent } from './products.component';
import { ProductsRoutingModule } from '@clients/products/src/lib/products-routing.module';
import { MidgardCrudModule } from '@src/midgard/modules/crud/crud.module';
import { MidgardSharedTranslationModule } from '@src/midgard/modules/translation/translation.shared.module';
import { ProductDetailComponent } from './pages/product-detail/product-detail.component';
import { MatButtonModule, MatIconModule } from '@angular/material';
import { MidgardFormModule } from '@src/midgard/modules/form/form.module';

@NgModule({
  imports: [
    MidgardCrudModule,
    MidgardFormModule,
    MidgardSharedTranslationModule,
    ProductsRoutingModule,
    MatButtonModule,
    MatIconModule
  ],
  declarations: [ProductsComponent, ProductDetailComponent],
  exports: [ProductsComponent]
})
export class ProductsModule { }
