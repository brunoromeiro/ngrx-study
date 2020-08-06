import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Store} from '@ngrx/store';
import {ActivatedRoute} from '@angular/router';
import {AddProduct, EditProduct, LoadProductById} from '../products/store/products.actions';
import {filter} from 'rxjs/operators';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit, OnDestroy {

  public productForm: FormGroup;
  public mode: string;
  public editModeId;
  public subscriptions = [];

  constructor(
    private fb: FormBuilder,
    private store: Store<any>,
    private router: ActivatedRoute
  ) {
    this.productForm = this.fb.group({
      name: [undefined],
      qty: [undefined]
    });
  }

  ngOnInit(): void {
    this.subscriptions.push(
      this.router.paramMap.subscribe(paramsMap => {
        this.editModeId = paramsMap.get('id');
        this.defineMode();
      })
    );

    this.subscriptions.push(
      this.store.select('products')
        .pipe(filter(state => state.currentProduct)).subscribe(v => {
          this.productForm.patchValue({...v.currentProduct});
      })
    );
  }

  defineMode(): void {
    if (!this.editModeId) {
      this.mode = 'NEW';
    } else {
      this.mode = 'EDIT';

      this.store.dispatch(new LoadProductById(this.editModeId));
    }
  }

  addProduct(): void {

    const newProduct = {
      id: Math.round(Math.random() * 100),
      ...this.productForm.value
    };
    this.store.dispatch(new AddProduct(newProduct));
  }

  editProduct(): void {
    this.store.dispatch(new EditProduct({id: this.editModeId, data: this.productForm.value}));
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subs => subs.unsubscribe());
  }
}
