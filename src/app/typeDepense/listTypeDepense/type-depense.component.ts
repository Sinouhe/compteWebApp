import { Component, OnInit } from '@angular/core';
import { ServiceToastMessageService } from '../../services/service-toast-message.service';
import { TypeDepense } from 'src/app/class/typeDepense';
import { TypeDepenseDAO } from 'src/app/class/typeDepense_DAO';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-type-depense',
  templateUrl: './type-depense.component.html',
  styleUrls: ['./type-depense.component.scss']
})
export class TypeDepenseComponent implements OnInit {

  private _tab_sTypesDepense: Array<TypeDepense>;

  constructor(private _serviceToastMessageService: ServiceToastMessageService,
              private _typeDepenseDAO: TypeDepenseDAO) {
                this._typeDepenseDAO.chargeTous().subscribe(
                  (data) => {
                    if (data.status === 'success') {
                      this._tab_sTypesDepense = data.result;
                      console.log(this._tab_sTypesDepense);
                    } else {
                      this._serviceToastMessageService.afficheMessage(environment.alert, data.message);
                    }
                  },
                  (error) => {
                    this._serviceToastMessageService.afficheMessage(environment.alert,
                                                                    error.message);
                  });
              }

  ngOnInit() { }

  public get tab_sTypesDepense(): Array<TypeDepense> {
    return this._tab_sTypesDepense;
  }

}
