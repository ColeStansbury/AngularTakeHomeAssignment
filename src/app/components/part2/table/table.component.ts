import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {PageEvent} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {Vaccine} from '../../../types/Vaccine';
import {MatSort} from '@angular/material/sort';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {AppState} from '../../../store/vaccine.reducer';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.sass']
})
export class TableComponent implements OnInit {
  vaccines: Vaccine[] = [];
  private vaccines$: Observable<AppState>;
  displayedColumns: string[] = [
    'jurisdiction',
    'week_of_allocations',
    '_1st_dose_allocations',
    '_2nd_dose_allocations',
  ];
  length: number;
  pageSize = 10;
  pageSizeOptions = [10, 30, 50, 75];
  dataSource: MatTableDataSource<Vaccine>;
  pageIndex = 0;
  @ViewChild(MatSort) sort = new MatSort();

  constructor(private store: Store<any>,
  ) {
    this.vaccines = [];
    this.vaccines$ = store.select('vaccines');
    this.dataSource = new MatTableDataSource<Vaccine>();
    this.length = 0;
    this.loadData(0, this.pageSize);
    this.length = this.vaccines.length;
  }

  ngOnInit(): void {
    this.vaccines$.subscribe(appState => {
      this.vaccines = appState.vaccines;
      this.loadData(this.pageIndex, this.pageSize);
      this.length = this.vaccines.length;
    });
  }

  onPageChange(e: PageEvent): void {
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;
    this.loadData(this.pageIndex, e.pageSize);
  }

  private loadData(pageIndex: number, pageSize: number): void {
    this.dataSource.data = this.vaccines.slice(pageIndex, pageIndex + pageSize);
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
