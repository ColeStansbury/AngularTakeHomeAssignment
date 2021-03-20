// Angular Imports
import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {BrowserModule} from '@angular/platform-browser';
import {ReactiveFormsModule} from '@angular/forms';

// App Imports
import {AppComponent} from './app.component';
import {NavBarComponent} from './components/nav-bar/nav-bar.component';
import {FormComponent} from './components/part1/form-component/form.component';
import {ResultComponent} from './components/part1/result-component/result.component';
import {Part1Component} from './components/part1/part1.component';
import {Part2Component} from './components/part2/part2.component';

// Flex Layout Imports
import {FlexLayoutModule, FlexModule} from '@angular/flex-layout';

// Angular Material Imports
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import {MatTableModule} from '@angular/material/table';
import {MatTabsModule} from '@angular/material/tabs';
import {MatToolbarModule} from '@angular/material/toolbar';

// Service Imports
import {HttpClientModule} from '@angular/common/http';

// State Management Imports
import {StoreModule} from '@ngrx/store';
import * as fromVaccines from './store/vaccine.reducer';
import {EffectsModule} from '@ngrx/effects';
import {VaccineEffects} from './store/vaccine.effects';
import { TableComponent } from './components/part2/table/table.component';
import { ChartComponent } from './components/part2/chart/chart.component';
import {ChartsModule} from "ng2-charts";

@NgModule({
  declarations: [
    // App declarations
    AppComponent,
    NavBarComponent,
    Part1Component,
    Part2Component,
    FormComponent,
    ResultComponent,
    TableComponent,
    ChartComponent,
  ],
  imports: [
    // Angular modules
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,

    // Flex modules
    FlexModule,
    FlexLayoutModule,

    // Angular Material Modules
    MatAutocompleteModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatSidenavModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    ReactiveFormsModule,

    // Service Imports
    HttpClientModule,

    // State Management
    StoreModule.forRoot({vaccines: fromVaccines.reducer}),
    EffectsModule.forRoot([VaccineEffects]),
    MatSortModule,
    MatPaginatorModule,
    ChartsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
