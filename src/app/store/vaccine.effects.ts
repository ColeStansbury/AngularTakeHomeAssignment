import {Injectable} from '@angular/core';
import {Actions, createEffect, EffectConfig, ofType} from '@ngrx/effects';
import {EMPTY} from 'rxjs';
import {map, mergeMap, catchError} from 'rxjs/operators';
import {VaccineService} from '../services/vaccine.service';
import * as vaccineActions from './vaccine.actions';

@Injectable()
export class VaccineEffects {
  loadVaccines$ = createEffect(() => this.actions$.pipe(
    ofType(vaccineActions.loadVaccines),
    mergeMap(() => this.vaccineService.getAllVaccineData()
      .pipe(
        map(vaccines => ({
            type: vaccineActions.loadVaccinesSuccess.type, vaccines
          }),
          catchError(() => EMPTY)
        ))
    )
  ));

  constructor(
    private actions$: Actions,
    private vaccineService: VaccineService
  ) {
  }
}
