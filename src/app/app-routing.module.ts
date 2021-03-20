import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {Part1Component} from './components/part1/part1.component';
import {Part2Component} from './components/part2/part2.component';

const routes: Routes = [
  {
    path: '',
    component: Part1Component,
  },
  {
    path: 'part1',
    component: Part1Component,
  },
  {
    path: 'part2',
    component: Part2Component,

  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
