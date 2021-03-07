import {Injectable} from '@angular/core';
// @ts-ignore
import * as packageJson from '../../../package.json';
@Injectable()
export class AppConfig {

    constructor() {
        document.title = this.appName;
    }

    appName = 'System Powiadomień o Opłatach';
    appDescript = 'Samorządowego Przedszkola Publicznego';
    appDescriptSubline1 = 'w Ośnie Lubuskim';
    appDescriptSubline2 = null;
    appVersion = `wersja ${packageJson.version}`;
    appCompany = 'Asseco Poland';

}
