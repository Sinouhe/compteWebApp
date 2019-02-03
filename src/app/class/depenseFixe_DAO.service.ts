import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { DepenseFixe } from './depenseFixe';
import { Observable, Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
  })
export class DepenseFixeDAO {

  private _subject: Subject<DepenseFixe>;

  constructor(private _http: HttpClient) {
    this._subject = new Subject();
  }

  public get subject(): Subject<DepenseFixe> {
    return this._subject;
  }

  public enregistreUn(p_sUserId: string, p_oDepenseFixe: DepenseFixe): Observable<any> {
      return this._http.post(`${environment.urlBackEnd}${environment.urlBackEndDepenseFixe}addOne`,
                                                          {'depenseFixe': p_oDepenseFixe, 'userId': p_sUserId})
                                                          .pipe(map((res) => {
                                                            return res;
                                                          }));
  }

  public modifieUn(p_sUserId: string, p_oDepenseFixe: DepenseFixe): Observable<any> {
    return this._http.post(`${environment.urlBackEnd}${environment.urlBackEndDepenseFixe}modifyOne`,
                                                          {'depenseFixe': p_oDepenseFixe, 'userId': p_sUserId})
                                                              .pipe(map((res) => {
                                                                return res;
                                                              }));
                                                              return null;
  }

  public chargeTous(p_sUserId: string): Observable<any> {
    const params = new HttpParams().set('userId', p_sUserId);
    return this._http.get(`${environment.urlBackEnd}${environment.urlBackEndDepenseFixe}all`, { params: params })
                                                          .pipe(map((res) => {
                                                            return res;
                                                          }));
  }

  public chargeObjetDepuisRetourBackEnd(p_object: any): DepenseFixe {
    const oTypeDepense: DepenseFixe = new DepenseFixe(p_object.sNom, p_object.sDescription, p_object.nMontant, p_object._id);
    return oTypeDepense;

  }

}
