import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-form-component',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.sass']
})
export class FormComponent implements OnInit {
  styleResultForm: FormGroup;
  fontUnits: string[];
  selectedUnit: string;
  fontNumber: string;
  @Input() Text = '';
  @Input() Color = 'blue';
  @Input() FontSize = '';
  @Output() TextChange = new EventEmitter<string>();
  @Output() ColorChange = new EventEmitter<string>();
  @Output() FontSizeChange = new EventEmitter<string>();


  constructor(private formBuilder: FormBuilder, private router: Router) {
    this.styleResultForm = this.formBuilder.group({
      text: [this.Text, Validators.required],
      color: [this.Color],
      font: [this.FontSize],
    });
    this.fontNumber = '12';
    this.fontUnits = ['cm', 'mm', 'in', 'px', 'pt', 'pc', 'em', 'ex', 'ch', 'rem', 'vw', 'vh',
      'vmin', 'vmax'].sort();
    this.selectedUnit = 'px';
  }

  ngOnInit(): void {

  }

  handleTextChange(event: Event): void {
    this.Text = (event.target as HTMLInputElement).value;
    this.TextChange.emit(this.Text);
  }

  handleColorChange(event: Event): void {
    this.Color = (event.target as HTMLInputElement).value;
    this.ColorChange.emit(this.Color);
  }

  handleFontSizeChange(event: Event): void {
    this.fontNumber = (event.target as HTMLInputElement).value;
    this.changeFont();
  }

  changeUnit(value: string): void {
    const validUnit = this.fontUnits
      .find(fs => value === fs);
    this.selectedUnit = validUnit ? validUnit : 'px';
    this.changeFont();
  }

  handleUnitChange(event: Event): void {
    this.changeUnit((event.target as HTMLInputElement).value);
  }

  private changeFont(): void {
    this.FontSize = this.fontNumber + this.selectedUnit;
    this.FontSizeChange.emit(this.FontSize);
  }
}
