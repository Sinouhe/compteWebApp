import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceToastMessageService {

  private _subject: Subject<any>;

  constructor() {
    this._subject = new Subject();
  }

  get subject(): Subject<any> {
    return this._subject;
  }

}
