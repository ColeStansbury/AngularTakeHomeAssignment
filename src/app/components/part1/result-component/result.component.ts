import {Component, Input, OnInit, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-result-component',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.sass']
})
export class ResultComponent implements OnInit {
  @Input() Text = '';
  @Input() Color = '';
  @Input() FontSize = '';

  constructor() { }

  ngOnInit(): void {
  }

}
