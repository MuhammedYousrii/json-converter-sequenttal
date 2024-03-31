  import { AfterViewInit, ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
  import { MatTableDataSource, MatTableModule } from '@angular/material/table';
  import { MatSort, MatSortModule } from '@angular/material/sort';
  import { Subject, debounceTime, distinctUntilChanged, filter, takeUntil } from 'rxjs';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

  @Component({
    selector: 'ui-table-body',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, MatTableModule, MatSortModule, MatPaginatorModule, MatFormFieldModule, MatInputModule],
    templateUrl: './table-body.component.html',
    styleUrls: ['./table-body.component.scss'],
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

      this.searchControl.valueChanges.pipe(
        takeUntil(this._destroy$),
        debounceTime(1000),
        distinctUntilChanged(),
        filter(searchValue => searchValue !== null),
      ).subscribe(searchValue => {
        this.tableDataSource.filter = searchValue || '';
      })
    }


    ngAfterViewInit(): void {
      if (!this.tableDataSource.sort) this.tableDataSource.sort = this.matSort;
      if (!this.tableDataSource.paginator) this.tableDataSource.paginator = this.matPaginator;
    }

   

    ngOnDestroy(): void {
      this._destroy$.next();
      this._destroy$.complete();
    }

}
