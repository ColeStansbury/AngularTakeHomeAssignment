import {Component, OnInit, ViewChild} from '@angular/core';
import {AppState} from '../../store/vaccine.reducer';
import {Store} from '@ngrx/store';
import {Vaccine} from '../../types/Vaccine';
import * as vaccineActions from '../../store/vaccine.actions';
import {Observable} from 'rxjs';


@Component({
  selector: 'app-part2',
  templateUrl: './part2.component.html',
  styleUrls: ['./part2.component.sass']
})
export class Part2Component implements OnInit {


  constructor(private store: Store<any>) {
  }

  ngOnInit(): void {
    this.store.dispatch(vaccineActions.loadVaccines());
  }

}
