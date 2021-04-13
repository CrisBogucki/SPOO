import {Component, OnInit} from '@angular/core';
import {User} from '../../../../@shared/models/user.model';
// @ts-ignore
import accountJson from '../../../../@core/mocks/data-seed/account.json';

@Component({
    selector: 'app-users',
    templateUrl: './users.component.html'
})
export class UsersComponent implements OnInit {

    private items: User[];

    constructor() {
    }

    ngOnInit() {
        this.items = accountJson;
    }

    onRefresh() {

    }

    onAddRow() {

    }

    onUpdateRow(item: User) {

    }

    onCancelAndRemoveRow(item: User) {

    }

    onRemoveRow(item: User) {

    }
}
