import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { TypeDepense } from './typeDepense';
import { Observable } from 'rxjs';
import { DAOinterface } from './DAOinterface';

@Injectable({
    providedIn: 'root'
  })
export class TypeDepenseDAO implements DAOinterface {

  constructor(private _http: HttpClient) { }

  public enregistreUn(p_oTypeDepense: TypeDepense): Observable<any> {
      return this._http.post(`${environment.urlBackEnd}${environment.urlBackEndTypeDpense}/addOne`, p_oTypeDepense)
                .pipe(map((res) => {
                return res;
                }));
  }

  public modifieUn(p_oTypeDepense: TypeDepense): Observable<any> {
    // méthode à faire
    alert('méthode TypeDepenseDAO:chargeTous appellé sns avoir été définit');
    return null;
  }

  public chargeTous(): Observable<any> {
    return this._http.get(`${environment.urlBackEnd}${environment.urlBackEndTypeDpense}all`)
                .pipe(map((res) => {
                return res;
                }));
  }

}
