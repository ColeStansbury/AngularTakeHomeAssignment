import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-part1',
  templateUrl: './part1.component.html',
  styleUrls: ['./part1.component.sass']
})
export class Part1Component implements OnInit {
  Text = '';
  Color = '';
  FontSize = '';

  constructor() {
  }

  ngOnInit(): void {
  }

}
