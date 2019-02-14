import {Component, OnInit, ViewChild} from '@angular/core';
import { getAllProducts } from '@libs/products/src/lib/state/products.selectors';
import { Store } from '@libs/midgard-angular/src/lib/modules/store/store';
import { setTopBarOptions } from '@libs/midgard-angular/src/lib/state/top-bar/top-bar.actions';
import {CardItemOptions} from 'freyja-ui';
import {ListComponent} from '../../../midgard-angular/src/lib/modules/crud/list/list.component';

@Component({
  selector: 'lib-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  public tableOptions;
  public cardItemOptions: CardItemOptions;
  @ViewChild('crudList') crudList: ListComponent;
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
  public selector = getAllProducts;


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
        prop: 'picture',
        label: 'Picture'
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
        },
        {
          label: 'Share',
          value: 'share'
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
        },
        {
          label: 'Share',
          value: 'share'
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
        {name: 'Name', prop: 'name', flex: 2, sortable: true, filtering: true},
        {name: 'Manu.', prop: 'make', flex: 2, sortable: true, filtering: true},
        {name: 'Model', prop: 'model', flex: 2, sortable: true, filtering: false},
        {name: 'Style', prop: 'style', flex: 2, sortable: true, filtering: false},
        {name: 'Description', prop: 'description', flex: 2, sortable: true, filtering: false},
        {name: 'Ref.', prop: 'reference_id', flex: 2, sortable: true, filtering: false},
        {name: 'Date Created', prop: 'create_date', index: 1, flex: 1, cellTemplate: 'date', sortable: true},
        {name: '', cellTemplate: 'actions', actions: ['delete']},
      ]
    };
  }

  /**
   * function that listens if an action from the card-item component has been triggered
   * @param {string} actionData - an object that contains the type of the action that has been triggered and the selected item
   */
  handleCardItemActionClicked(actionData: {actionType: string, item: any}) {
    switch (actionData.actionType) {
      case 'new':
        const itemIndex = this.crudList.rows.indexOf(actionData.item) + 1;
        // generate a placeholder item
        const placeholderItem = {};
        Object.keys(this.cardItemOptions).forEach( cardItemOptionKey => {
          placeholderItem[this.cardItemOptions[cardItemOptionKey].prop] = this.cardItemOptions[cardItemOptionKey].label;
        });
        this.cardItemOptions.details.forEach( detailItem => {
          placeholderItem[detailItem.prop] = detailItem.label;
        });
        return this.crudList.createItem(placeholderItem, itemIndex);
      case 'delete':
        return this.crudList.deleteItem(item);
      default:
        return false;
    }
  }

  /**
   * function that is triggered when the card item is edited
   * @param {string} editedData - an object that contains the edited object and the current card item data
   */
  handleCardItemEdited(editedData: {editedObj: any, item: any}) {
    let editedProperty;
    if (editedData.editedObj.index !== undefined) {
      editedProperty = this.cardItemOptions[editedData.editedObj.element][editedData.editedObj.index].prop;
    } else {
      editedProperty = this.cardItemOptions[editedData.editedObj.element].prop;
    }
    const newItem: any = {};
    newItem.id = editedData.item.id;
    newItem.name = editedData.item.name;
    if (editedData.editedObj.value && editedData.editedObj.value !== '') {
      newItem[editedProperty] = editedObj.value;
      this.store.dispatch({
        type: this.updateAction,
        data: newItem
      });
    }
  }
}

