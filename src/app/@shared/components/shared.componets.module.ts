import {NgModule} from '@angular/core';
import {DialogComponent} from './dialog/dialog.component';
import {DialogService} from './dialog/dialog.service';
import {CommonModule} from '@angular/common';


@NgModule({
  declarations: [
    DialogComponent
  ],
  providers: [DialogService],
  imports: [
    CommonModule
  ],
  exports: [DialogComponent]
})
export class SharedComponetsModule {
}
