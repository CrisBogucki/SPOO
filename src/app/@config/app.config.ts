import {Injectable} from '@angular/core';
// @ts-ignore
import * as packageJson from '../../../package.json';
@Injectable()
export class AppConfig {

    constructor() {
        document.title = this.appName;
    }

    accountNumber = '72150021524284751375746041';
    street = 'Kolorowa 7';
    city = 'Gorzów Wielkopolski';
    zipCode = '66-400';

    appName = 'System Powiadomień o Opłatach';
    appNameShort = 'SPoO';
    appDescript = 'Samorządowe Przedszkole Publiczne';
    appDescriptSubline1 = `ul.${this.street}, ${this.zipCode} ${this.city}`;
    appDescriptSubline2 = null;
    appVersion = `wersja ${packageJson.version}`;
    appCompany = 'CRIS';




}
