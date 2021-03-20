import {Component, OnInit} from '@angular/core';
import {Label} from 'ng2-charts';
import {ChartDataSets, ChartOptions, ChartType} from 'chart.js';
import {Store} from '@ngrx/store';
import {Vaccine} from '../../../types/Vaccine';
import {Observable} from 'rxjs';
import {AppState} from '../../../store/vaccine.reducer';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.sass']
})
export class ChartComponent implements OnInit {
  vaccines: Vaccine[] = [];
  private vaccines$: Observable<AppState>;
  barChartOptions: ChartOptions = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: {xAxes: [{}], yAxes: [{}]},
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
      }
    }
  };
  public readonly barChartType: ChartType = 'bar';
  public readonly barChartLegend = true;
  public barChartPlugins = [];
  public barChartLabels: Label[] = [];
  public barChartData: ChartDataSets[] = [];

  constructor(private store: Store<any>,
  ) {
    this.vaccines = [];
    this.vaccines$ = store.select('vaccines');
  }

  ngOnInit(): void {
    this.vaccines$.subscribe(appState => {
      this.vaccines = appState.vaccines;
      if (this.vaccines.length !== 0) {
        const barChartMap = this.loadData();
        this.barChartLabels = [...barChartMap.keys()].map(entry => entry.chartLabel);
        this.barChartData =
          [...barChartMap.values()][0]. // Use the first map entry to pivot the data by each label
            map(dataSets => ({
              label: dataSets.label,                             // Assign the label
              data: [...barChartMap.values()]
                .map(dataSet => dataSet                          // For each array in the map
                  .filter(data => data.label === dataSets.label) // Find the array with the correct label
                  .map(data => data.data)[0])                    // Collect the corresponding value
            }));
      }
    });
  }

  /**
   * A helper function to pivot the vaccines data set into a map consisting of categorical labels
   * by jurisdiction as keys and first then second dose allocations as values. Sorts the key set
   * by dose 1 descending, dose 2 descending then jurisdiction ascending. Expects vaccines array to
   * be correctly pre-populated.
   * @private
   * @returns barChartMap the pivoted data in a sorted map
   */
  private loadData(): Map<{ chartLabel: string }, { data: number, label: string }[]> {
    // Select distinct jurisdictions as labels using a set data structure
    const labels = [...new Set(this.vaccines.map(vax => vax.jurisdiction))];

    // Declare map to associate chart labels with data numbers and data label
    let barChartMap: Map<{ chartLabel: string }, { data: number, label: string }[]> = new Map();

    // Pivot vaccine allocations with totals per state
    // Note - time/space complexity might be able to be improved
    labels.forEach(jurisdiction =>
      barChartMap.set({chartLabel: jurisdiction},
        [{
          data: this.vaccines.filter(vax => jurisdiction === vax.jurisdiction)
            .map(vax => Number(vax._1st_dose_allocations))
            .reduce((vaxSum: number, num: number) => {
              return vaxSum + num;
            }, 0),
          label: '1st Dose Allocation'
        },
          {
            data: this.vaccines.filter(vax => jurisdiction === vax.jurisdiction)
              .map(vax => Number(vax._2nd_dose_allocations))
              .reduce((vaxSum: number, num: number) => {
                return vaxSum + num;
              }, 0),
            label: '2nd Dose Allocation'
          },
        ]
      ));

    // Sort by 1st allocation desc, 2nd allocation desc then jurisdiction asc
    barChartMap = new Map([...barChartMap.entries()].sort((a, b) =>
      (-1 * // allocations descending
        // Upon adding more than two datasets, perform this iteratively instead of direct addressing
        (a[1][0].data - b[1][0].data // 1st dataset (dose 1)
          ||
          a[1][1].data - b[1][1].data))  // 2nd dataset (dose 2)
      ||
      a[0].chartLabel.localeCompare(b[0].chartLabel) // Compare alphabetically if all doses are the same
    ));
    return barChartMap;
  }

}
