import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';

@Injectable()
export class DialogService {

  private subject = new Subject<any>();

  private setDialogYesNo(title: string, message: string, yesFn: () => void, noFn: () => void): any {
    const that = this;
    this.subject.next({
      type: 'confirm',
      text: message,
      title,
      yesFn(): any {
        that.subject.next();
        yesFn();
      },
      noFn(): any {
        that.subject.next();
        noFn();
      }
    });
  }


  private setDialogOk(title: string, message: string, okFn: () => void): any {
    const that = this;
    this.subject.next({
      type: 'dialogOk',
      text: message,
      title,
      okFn(): any {
        that.subject.next();
        okFn();
      }
    });
  }

  dialogYesNo(title: string, message: string, yesFn: () => void, noFn: () => void): any {
    this.setDialogYesNo(title, message, yesFn, noFn);
  }

  dialogOk(title: string, message: string, okFn: () => void): any {
    this.setDialogOk(title, message, okFn);
  }



  getMessage(): Observable<any> {
    return this.subject.asObservable();
  }
}

