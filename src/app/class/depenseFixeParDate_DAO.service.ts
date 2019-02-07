import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { TypeDepense } from './typeDepense';
import { Observable, Subject } from 'rxjs';
import { DepenseFixeParDate } from './depenseFixeParDate.service';
import { DepenseFixe } from './depenseFixe';
import { DepenseFixeDAO } from './depenseFixe_DAO.service';
import { InterfaceModeleDAO } from './modelDeClasse/modeleDAO';

@Injectable({
    providedIn: 'root'
  })
export class DepenseFixeParDateDAO implements InterfaceModeleDAO {

  private _subject: Subject<TypeDepense>;

  constructor(private _http: HttpClient,
              private _oDepenseFixeDAO: DepenseFixeDAO) {
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

  public chargeObjetDepuisRetourBackEnd(p_object: any): Array<DepenseFixeParDate> {

    const tab_oDepenseFixeParDate: Array<DepenseFixeParDate> = new Array<DepenseFixeParDate>();

    for (const entry of p_object) {

      let oDepenseFixe: DepenseFixe;
      if (entry.odepenseFixe) {
        oDepenseFixe = this._oDepenseFixeDAO.chargeObjetDepuisRetourBackEnd(entry.odepenseFixe);
      } else {
        oDepenseFixe = null;
      }
      tab_oDepenseFixeParDate.push(new DepenseFixeParDate(entry._id,
                                                          entry.bPaye,
                                                          entry.nMois,
                                                          entry.nAnnee,
                                                          oDepenseFixe));

    }

    return tab_oDepenseFixeParDate;

  }

  public chargeTous(p_sUserId: string, p_nMois: number, p_nAnnee: number): Observable<any> {
    const params = new HttpParams().set('userId', p_sUserId)
                                    .set('_nMois', p_nMois.toString())
                                    .set('_nAnnee', p_nAnnee.toString());
    return this._http.get(`${environment.urlBackEnd}${environment.urlBackEndDepenseFixeParDate}all`, { params: params })
                                                          .pipe(map((res) => {
                                                            return res;
                                                          }));
  }
}
