import { Component, OnInit } from '@angular/core';
import { getAllProducts } from '@libs/products/src/lib/state/products.selectors';

@Component({
  selector: 'lib-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  public formFields;
  public graphQlQuery;
  public selector;

  constructor(
  ) { }

  ngOnInit() {
    this.selector = getAllProducts;
    this.defineFormFields();
  }

  /**
   * defines form fields of the detail view
   */
  defineFormFields() {
    this.formFields = [
      {label: 'Name', controlName: 'name', type: 'text', validators: ['required'] },
      {label: 'Manufacturer', controlName: 'make', type: 'text'},
      {label: 'Model', controlName: 'model', type: 'text' },
      {label: 'Style', controlName: 'style', type: 'text'},
      {label: 'Description', controlName: 'description', type: 'text' },
      {label: 'Ref.', controlName: 'reference_id', type: 'text' },
    ];
  }

}
