import { NgModule } from '@angular/core';
import { ProductsComponent } from './products.component';
import { ProductsRoutingModule } from '@libs/products/src/lib/products-routing.module';
import { MidgardCrudModule } from '@libs/midgard-angular/src/lib/modules/crud/crud.module';
import { MidgardSharedTranslationModule } from '@libs/midgard-angular/src/lib/modules/translation/translation.shared.module';

@NgModule({
  imports: [
    MidgardCrudModule,
    MidgardSharedTranslationModule,
    ProductsRoutingModule
  ],
  declarations: [ProductsComponent],
  exports: [ProductsComponent]
})
export class ProductsModule { }
