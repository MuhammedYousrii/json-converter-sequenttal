import { AfterViewInit, ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { Subject, debounceTime, distinctUntilChanged, filter, takeUntil } from 'rxjs';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CapitalizePipe } from '../pipes/capitalize/capitalize.pipe';
  @Component({
    selector: 'ui-table-body',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, MatTableModule, MatSortModule, MatPaginatorModule, MatFormFieldModule, MatInputModule, CapitalizePipe],
    templateUrl: './table-body.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
  })
  export class TableBodyComponent<T> implements OnInit, OnDestroy, AfterViewInit {
    
    @Input() dataSource$: Subject<T[]> = new Subject<T[]>();
    @Input() pageSizeOptions: number[] = [5, 10, 25, 100];
    @Input() pageSize = 5;

    private _destroy$ = new Subject<void>();

    public tableDataSource = new MatTableDataSource<T, MatPaginator>([]);
    public displayedColumns: string[] = [];


    public searchControl = new FormControl('')


    @ViewChild(MatSort) matSort!: MatSort;
    @ViewChild(MatPaginator) matPaginator!: MatPaginator;


    ngOnInit(): void {
      this.dataSource$.pipe(
        takeUntil(this._destroy$)).subscribe((data: T[]) => {
        this.tableDataSource.data = data;
        this.displayedColumns = data.length > 0 ? Object.keys((data[0] as any)) : [];
       
      });

      this._provideSearch();

    }

    ngAfterViewInit(): void {
      if (!this.tableDataSource.sort) this.tableDataSource.sort = this.matSort;
      if (!this.tableDataSource.paginator) this.tableDataSource.paginator = this.matPaginator;
    }

   

    ngOnDestroy(): void {
      this._destroy$.next();
      this._destroy$.complete();
    }

    // Provide search functionality through structing data stream to process the search value.
    private _provideSearch() {
      this.searchControl.valueChanges.pipe(
        debounceTime(500),
        distinctUntilChanged(),
        filter(searchValue => searchValue !== null),
      ).subscribe(searchValue => this.tableDataSource.filter = searchValue || '' )
    }

}
