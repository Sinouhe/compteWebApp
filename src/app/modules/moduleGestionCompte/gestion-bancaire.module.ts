import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { GestionCompteComponent } from './gestion-compte/gestion-compte.component';
import { AuthGuard } from '../../router/auth-guard.service';
import { AngularMaterialModule } from '../../materialAngular.module';
import { GeneralModule } from '../../general.module';

const routes = [
  {path: 'principal', canActivate: [AuthGuard], component: GestionCompteComponent},
];

@NgModule({
  declarations: [GestionCompteComponent],
  imports: [RouterModule.forChild(routes),
            AngularMaterialModule,
            GeneralModule
          ],
  exports: [RouterModule]
})
export class GestionBancaireModule { }
