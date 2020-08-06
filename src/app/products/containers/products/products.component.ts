import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';
import {RemoveProduct} from './store/products.actions';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  public products$: Observable<any>;

  constructor(
    private store: Store<any>
  ) {
  }

  ngOnInit(): void {
    this.products$ = this.store.select('products');
  }

  remove(id) {
    this.store.dispatch(new RemoveProduct(id));
  }

}
