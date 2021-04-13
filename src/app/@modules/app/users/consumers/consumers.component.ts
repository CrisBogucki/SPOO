import { Component, OnInit } from '@angular/core';
import {Consumer} from '../../../../@shared/models/consumers.model';
// @ts-ignore
import dataJson from '../../../../@core/mocks/data-seed/consumers.json';

@Component({
  selector: 'app-consumers',
  templateUrl: './consumers.component.html'
})
export class ConsumersComponent implements OnInit {

  private items: Consumer[];

  constructor() {
  }

  ngOnInit() {
    this.items = dataJson;
  }

  onRefresh() {

  }

  onAddRow() {

  }

  onUpdateRow(item: Consumer) {

  }

  onCancelAndRemoveRow(item: Consumer) {

  }

  onRemoveRow(item: Consumer) {

  }

}
