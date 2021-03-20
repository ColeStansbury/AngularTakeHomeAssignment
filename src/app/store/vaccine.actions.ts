import {createAction, props} from '@ngrx/store';
import {LOAD_VACCINES, LOAD_VACCINES_SUCCESS} from './action.types';
import {Vaccine} from '../types/Vaccine';


export const loadVaccines = createAction(LOAD_VACCINES);
export const loadVaccinesSuccess = createAction(LOAD_VACCINES_SUCCESS, props<{ vaccines: Vaccine[] }>());
