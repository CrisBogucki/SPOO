import {Component, OnInit} from '@angular/core';
import {DialogService} from './dialog.service';

@Component({
  selector: 'app-modal',
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

