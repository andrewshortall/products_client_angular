import { Routes } from '@angular/router';
import { RouterModule } from '@angular/router';
import { ProductsComponent } from '@libs/products/src/lib/products.component';

const contactsRoutes: Routes = [
  {
    path: '', component: ProductsComponent
  }
];

export const ProductsRoutingModule = RouterModule.forChild(contactsRoutes);
