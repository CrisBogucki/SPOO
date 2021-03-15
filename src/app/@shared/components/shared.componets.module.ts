import {NgModule} from '@angular/core';
import {DialogComponent} from './dialog/dialog.component';
import {DialogService} from './dialog/dialog.service';
import {CommonModule} from '@angular/common';
import {DropdownComponent} from './dropdown/dropdown.component';


@NgModule({
  declarations: [
    DialogComponent,
    DropdownComponent
  ],
  providers: [DialogService],
  imports: [
    CommonModule
  ],
  exports: [DialogComponent, DropdownComponent]
})
export class SharedComponetsModule {
}
