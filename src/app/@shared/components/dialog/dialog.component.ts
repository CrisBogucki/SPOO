import {Component, OnInit} from '@angular/core';
import {DialogService} from './dialog.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'shared-app-dialog',
  templateUrl: './dialog.component.html'
})
export class DialogComponent implements OnInit {

  message: any;
  isActive: boolean | true;

  constructor(private confirmDialogService: DialogService) {
  }

  ngOnInit(): any {
    this.confirmDialogService.getMessage().subscribe(message => {
      this.message = message;
    });
  }
}

