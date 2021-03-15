import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'shared-app-dropdown',
  templateUrl: './dropdown.component.html'
})
export class DropdownComponent implements OnInit {

  @Input('name') name: string;
  @Input('is-active') isActive: boolean;
  @Input('selected') selectedId: string;
  @Input('items') items: { key: string, value: string }[];
  @Output('value') valueEmiter: EventEmitter<{ key: string, value: string }> = new EventEmitter();

  constructor() {
  }

  ngOnInit() {
  }

  onSelect(item: { key: string, value: string }): void {
    this.valueEmiter.emit(item);
  }

}
