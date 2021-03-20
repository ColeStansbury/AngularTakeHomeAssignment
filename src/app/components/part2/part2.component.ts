import {Component, OnInit, ViewChild} from '@angular/core';
import {AppState} from '../../store/vaccine.reducer';
import {Store} from '@ngrx/store';
import {Vaccine} from '../../types/Vaccine';
import * as vaccineActions from '../../store/vaccine.actions';
import {Observable} from 'rxjs';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {PageEvent} from '@angular/material/paginator';


@Component({
  selector: 'app-part2',
  templateUrl: './part2.component.html',
  styleUrls: ['./part2.component.sass']
})
export class Part2Component implements OnInit {
  private vaccines$: Observable<AppState>;
  vaccines: Vaccine[];



  constructor(
    private store: Store<any>,
  ) {
    this.vaccines = [];
    this.vaccines$ = store.select('vaccines');

  }

  ngOnInit(): void {
    this.store.dispatch(vaccineActions.loadVaccines());
  }

}
