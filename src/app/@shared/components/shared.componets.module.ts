import {NgModule} from '@angular/core';
import {DialogComponent} from './modal/dialog.component';
import {DialogService} from './modal/dialog.service';
import {CommonModule} from '@angular/common';


@NgModule({
  declarations: [DialogComponent],
  providers: [DialogService],
  imports: [
    CommonModule
  ],
  exports: [DialogComponent]
})
export class SharedComponetsModule {
}
