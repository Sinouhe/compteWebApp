import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { TypeDepense } from './typeDepense';
import { Observable, Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
  })
export class DepenseFixeParDateDAO {

  private _subject: Subject<TypeDepense>;

  constructor(private _http: HttpClient) {
    this._subject = new Subject();
  }

  public get subject(): Subject<TypeDepense> {
    return this._subject;
  }

  public createNew(p_sUserId: string, p_nMois: number, p_nAnnee: number): Observable<any> {
    console.log(p_sUserId + ' - ' + p_nMois + ' - ' + p_nAnnee);
    return this._http.post(`${environment.urlBackEnd}${environment.urlBackEndDepenseFixeParDate}createNew`,
                                                          {'_nMois': p_nMois, '_nAnnee': p_nAnnee, 'userId': p_sUserId})
                                                          .pipe(map((res) => {
                                                            return res;
                                                          }));
  }
}
