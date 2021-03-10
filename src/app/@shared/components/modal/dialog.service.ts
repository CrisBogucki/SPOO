import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';

@Injectable()
export class DialogService {

  private subject = new Subject<any>();

  private setConfirmation(title: string, message: string, yesFn: () => void, noFn: () => void): any {
    const that = this;
    this.subject.next({
      type: 'confirm',
      text: message,
      title,
      yesFn(): any {
        that.subject.next(); // This will close the modal
        yesFn();
      },
      noFn(): any {
        that.subject.next();
        noFn();
      }
    });
  }

  confirmYesNo(title: string, message: string, yesFn: () => void, noFn: () => void): any {
    this.setConfirmation(title, message, yesFn, noFn);
  }

  getMessage(): Observable<any> {
    return this.subject.asObservable();
  }

}

