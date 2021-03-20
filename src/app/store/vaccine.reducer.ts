import * as vaccineActions from './vaccine.actions';
import {Vaccine} from '../types/Vaccine';
import {Action, createReducer, on} from '@ngrx/store';


export interface AppState {
  readonly vaccines: Vaccine[];
}

export const initialState: AppState =
  {
    vaccines: new Array<Vaccine>()
  };

const vaccineReducer = createReducer(
  initialState,
  on(vaccineActions.loadVaccines, state => ({...state})),
  on(vaccineActions.loadVaccinesSuccess, (state, {vaccines}) => ({
    ...state, vaccines
  }))
);


export function reducer(state: AppState | undefined, action: Action): AppState {
  return vaccineReducer(state, action);
}
