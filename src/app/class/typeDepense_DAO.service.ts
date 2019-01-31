import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { TypeDepense } from './typeDepense';
import { Observable, Subject } from 'rxjs';
import { DAOinterface } from './DAOinterface';

@Injectable({
    providedIn: 'root'
  })
export class TypeDepenseDAO {

  private _subject: Subject<TypeDepense>;

  constructor(private _http: HttpClient) {
    this._subject = new Subject();
  }

  public get subject(): Subject<TypeDepense> {
    return this._subject;
  }

  public enregistreUn(p_oTypeDepense: TypeDepense): Observable<any> {
      return this._http.post(`${environment.urlBackEnd}${environment.urlBackEndTypeDpense}modifyOne`, p_oTypeDepense)
                .pipe(map((res) => {
                  return res;
                }));
  }

  public modifieUn(p_sUserId: string, p_oTypeDepense: TypeDepense): Observable<any> {
    return this._http.post(`${environment.urlBackEnd}${environment.urlBackEndTypeDpense}modifyOne`,
                                                          {'typeDepense': p_oTypeDepense, 'userId': p_sUserId})
                                                              .pipe(map((res) => {
                                                                return res;
                                                              }));
  }

  public chargeTous(): Observable<any> {
    return this._http.get(`${environment.urlBackEnd}${environment.urlBackEndTypeDpense}all`)
                .pipe(map((res) => {
                return res;
                }));
  }

}
