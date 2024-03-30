import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Observable, debounceTime, distinctUntilChanged, startWith } from 'rxjs';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';


interface FilterOption {
  key: string;
  values: any[];
}
@Component({
  selector: 'ui-filter-box',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatSelectModule],
  templateUrl: './filter-box.component.html',
  styleUrl: './filter-box.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class FilterBoxComponent implements OnInit {


  @Input() key!: string;
  @Input() values: string[] = [];
  @Output() uponFilterChange = new EventEmitter<FilterOption[]>();




  public filterControl = new FormControl();
  public readonly filteredValue$!: Observable<string[]>;


  constructor() {
    this.filteredValue$ = this.filterControl.valueChanges.pipe(
      startWith(''),
      distinctUntilChanged());
  }

  ngOnInit(): void {
      this.filterControl.valueChanges.subscribe(filter => {
        this.filterGotChange(filter)
      })
  }



  filterGotChange(values: string) {
    this.uponFilterChange.emit([{key: this.key, values: [values]}]);
  }

}
