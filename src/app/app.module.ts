import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {RouterModule, Routes} from '@angular/router';
import {ProductsComponent} from './products/containers/products/products.component';
import {SharedModule} from './shared/shared.module';
import {StoreModule} from '@ngrx/store';
import {ProductsModule} from './products/products.module';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {environment} from '../environments/environment';

const routes: Routes = [
  {
    path: 'products',
    component: ProductsComponent
  },
  { path: '',
    redirectTo: '/products',
    pathMatch: 'full'
  },
  { path: '**',
    redirectTo: '/products'
  }
];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    StoreModule.forRoot({}),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    BrowserModule,
    SharedModule,
    RouterModule.forRoot(routes),
    ProductsModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
