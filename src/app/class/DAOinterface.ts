import { Observable } from 'rxjs';

export interface DAOinterface {

    enregistreUn(p_oObject: any): Observable<any>;
    modifieUn(p_oObject: any): Observable<any>;
    chargeTous(): Observable<any>;

}
