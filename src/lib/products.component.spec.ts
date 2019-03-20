import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsComponent } from './products.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MidgardStoreModule } from '../../../../midgard/modules/store/store.module';
import { StoreMock } from '../../../../midgard/modules/store/store-mock';
import { Store } from '../../../../midgard/modules/store/store';

describe('ProductsComponent', () => {
  let component: ProductsComponent;
  let fixture: ComponentFixture<ProductsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MidgardStoreModule.forRoot()],
      declarations: [ ProductsComponent ],
      providers: [
        {provide: Store, useClass: StoreMock}
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
