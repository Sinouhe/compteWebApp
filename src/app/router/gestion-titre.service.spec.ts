import { TestBed } from '@angular/core/testing';

import { GestionTitreService } from './gestion-titre.service';
import { GeneralModule } from '../general.module';
import { AngularMaterialModule } from '../materialAngular.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RoutesCompteWebAppModule } from './routes-compte-web-app/routes-compte-web-app.module';
import { FormsModule } from '@angular/forms';
import { APP_BASE_HREF } from '@angular/common';
import { PageNotFoundComponent } from './pageNotFound/page-not-found/page-not-found.component';

describe('GestionTitreService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    declarations: [
        PageNotFoundComponent,
      ],
    imports: [
      GeneralModule,
      AngularMaterialModule,
      RoutesCompteWebAppModule,
      BrowserAnimationsModule,
      FormsModule,
    ],
    providers: [
      { provide: APP_BASE_HREF, useValue : '/' }
    ]
  }));

  it('should be created', () => {
    const service: GestionTitreService = TestBed.get(GestionTitreService);
    expect(service).toBeTruthy();
  });
});
