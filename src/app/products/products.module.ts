import {NgModule} from '@angular/core';
import {ProductsComponent} from './containers/products/products.component';
import {ProductComponent} from './containers/product/product.component';
import {RouterModule, Routes} from '@angular/router';
import {SharedModule} from '../shared/shared.module';

const routes: Routes = [
  {
    path: 'products',
    component: ProductsComponent,
    children: [
      {
        path: 'new',
        component: ProductComponent
      },
      {
        path: 'edit/:id',
        component: ProductComponent
      }
    ]
  }
];

@NgModule({
  declarations: [
    ProductsComponent,
    ProductComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(routes),
  ],
  exports: [
    ProductsComponent
  ],
})
export class ProductsModule {
}
