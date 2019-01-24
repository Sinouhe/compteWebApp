import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceModalBootstrapService {

  private _subject: Subject<any>;

  constructor() {
    this._subject = new Subject();
  }

  get subject(): Subject<any> {
    return this._subject;
  }

}
