import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { distinctUntilChanged, startWith } from 'rxjs';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import { CapitalizePipe } from '../pipes/capitalize/capitalize.pipe';
import { FilterOptionModel } from './filter-box.models';

@Component({
  selector: 'ui-filter-box',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatSelectModule, CapitalizePipe],
  templateUrl: './filter-box.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class FilterBoxComponent implements OnInit {


  @Input() key!: string;
  @Input() values: string[] = [];
  @Output() uponFilterChange = new EventEmitter<FilterOptionModel[]>();


  public filterControl = new FormControl();

  
  ngOnInit(): void {
    // Construct an stream to emit the selected values after filtering it.
    this.filterControl.valueChanges.pipe(
      startWith(''),
      distinctUntilChanged()
    ).subscribe(filter => {
      this.filterGotChange(filter)
    })
  }



  filterGotChange(values: string[]) {
    this.uponFilterChange.emit([{key: this.key, values: values}]);
  }

}
