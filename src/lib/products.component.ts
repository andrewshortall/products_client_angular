import {Component, OnInit, ViewChild} from '@angular/core';
import { getAllProducts } from '@clients/products/src/lib/state/products.selectors';
import { Store } from '@src/midgard/modules/store/store';
import { setTopBarOptions } from '@src/midgard/state/top-bar/top-bar.actions';
import {CardItemOptions} from 'freyja-ui';
import {CrudComponent} from '@src/midgard/modules/crud/crud.component';
import { getProductsLoaded } from './state/products.selectors';

@Component({
  selector: 'lib-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  public tableOptions;
  public cardItemOptions: CardItemOptions;
  @ViewChild('crud') crud: CrudComponent;
  public topBarOptions = [
    {
      label: 'All',
      value: 'all'
    },
    {
      label: 'Active',
      value: 'active'
    },
    {
      label: 'Disabled',
      value: 'disabled'
    }
  ];
  public graphQlQuery;
  public dataSelector = getAllProducts;
  public loadedSelector = getProductsLoaded;

  constructor(private store: Store<any>) {
  }

  ngOnInit() {
    this.store.dispatch(setTopBarOptions(this.topBarOptions));
    this.defineCardItemOptions();
    this.defineTableOptions();
  }

  /**
   * defines options for card item components
   */
  private defineCardItemOptions() {
    this.cardItemOptions = {
      title: {
        prop: 'name',
        label: 'Product Name'
      },
      subText: {
        prop: 'make',
        label: 'Product Brand'
      },
      subText2: {
        prop: 'type',
        label: 'Product Type'
      },
      caption: {
        prop: 'reference_id',
        label: 'Ref.'
      },
      link: {
        prop: 'style',
        label: 'Style'
      },
      picture: {
        image: 'picture',
        thumbnail: 'picture'
      },
      date1: {
        prop: 'create_date',
        label: 'Created at'
      },
      date2: {
        prop: 'edit_date',
        label: 'Updated at'
      },
      details: [
        {
          prop: 'model',
          label: 'Model'
        },
        {
          prop: 'status',
          label: 'Status'
        },
      ],
      description: {
        prop: 'description',
        label: 'Description'
      },
      belowMenuPrimaryAction: {
        label: 'New Product',
        value: 'new'
      },
      secondaryAction: {
        label: 'Publish',
        value: 'publish'
      },
      otherActions: [
        {
          label: '•••',
          value: '•••'
        },
        {
          label: 'Delete',
          value: 'delete'
        }
      ],
      belowMenuOtherActions: [
        {
          label: '•••',
          value: '•••'
        },
        {
          label: 'Delete',
          value: 'delete'
        }
      ]
    };
  }

  /**
   * defines options for the table component
   */
  private defineTableOptions() {
    this.tableOptions = {
      columns: [
        {name: 'Name', cellTemplate: 'picture-edit', prop: 'name', flex: 2, sortable: true, filtering: true},
        {name: 'Manu.', cellTemplate: 'edit', prop: 'make', flex: 2, sortable: true, filtering: true},
        {name: 'Model', cellTemplate: 'edit', prop: 'model', flex: 2, sortable: true, filtering: false},
        // {name: 'Style', cellTemplate: 'edit', prop: 'style', flex: 2, sortable: true, filtering: false},
        // {name: 'Description', cellTemplate: 'edit', prop: 'description', flex: 2, sortable: true, filtering: false},
        {name: 'Ref.', cellTemplate: 'edit', prop: 'reference_id', flex: 2, sortable: true, filtering: false},
        {name: 'Date Created', prop: 'create_date', index: 1, flex: 2, cellTemplate: 'date', sortable: true},
        {name: '', cellTemplate: 'actions', actions: this.cardItemOptions.otherActions},
      ]
    };
  }

  /**
   * function that listens if an action from the card-item component has been triggered
   * @param {string} actionData - an object that contains the type of the action that has been triggered and the selected item
   */
  handleItemActionClicked(actionData: {actionType: string, item: any}) {
    let itemIndex;
    switch (actionData.actionType) {
      case 'new':
        if (actionData.item) {
          itemIndex = this.crud.rows.indexOf(actionData.item) + 1;
        } else {
          itemIndex = 1;
        }
        // generate a placeholder item
        const placeholderItem = {};
        Object.keys(this.cardItemOptions).forEach( cardItemOptionKey => {
          if (!(this.cardItemOptions[cardItemOptionKey].prop === 'create_date' ||
            this.cardItemOptions[cardItemOptionKey].prop === 'edit_date')) {
            placeholderItem[this.cardItemOptions[cardItemOptionKey].prop] = this.cardItemOptions[cardItemOptionKey].label;
          }
        });
        this.cardItemOptions.details.forEach( detailItem => {
          placeholderItem[detailItem.prop] = detailItem.label;
        });
        return this.crud.createItem(placeholderItem, itemIndex);
      case 'delete':
        return this.crud.deleteItem(actionData.item);
      default:
        return false;
    }
  }

  /**
   * function that is triggered when an item is edited inline
   * @param {string} editedField - an object that contains the edited property and the edited value of the field object and the current card item data
   * @param {string} idProperty - The id property
   */
  handleItemEdited(editedField: {value: any, property, itemData: any}, idProperty) {
    const {value, property, itemData} = editedField;
    const newItem: any = {};
    newItem[idProperty] = itemData[idProperty];
    newItem.name = itemData.name;
    if (value && value !== '') {
      newItem[property] = value;
      this.crud.updateItem(newItem);
    }
  }
}

