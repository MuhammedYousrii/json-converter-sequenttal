  import { ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
  import { MatTableDataSource, MatTableModule } from '@angular/material/table';
  import { MatSort, MatSortModule } from '@angular/material/sort';
  import { Subject, takeUntil } from 'rxjs';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { CommonModule } from '@angular/common';

  @Component({
    selector: 'ui-table-body',
    standalone: true,
    imports: [CommonModule, MatTableModule, MatSortModule, MatPaginatorModule],
    templateUrl: './table-body.component.html',
    styleUrls: ['./table-body.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
  })
  export class TableBodyComponent<T> implements OnInit, OnDestroy {
    
    @Input() dataSource$: Subject<T[]> = new Subject<T[]>();
    private _destroy$ = new Subject<void>();

    public tableDataSource = new MatTableDataSource<T, MatPaginator>([]);
    public displayedColumns: string[] = [];
    readonly pageSizeOptions = [5, 10, 25, 100];
    readonly pageSize = 5;

    @ViewChild(MatSort, { static: false}) matSort!: MatSort;
    @ViewChild(MatPaginator, {static: false}) matPaginator!: MatPaginator;


    ngOnInit(): void {
      this.dataSource$.pipe(
        takeUntil(this._destroy$)).subscribe((data: T[]) => {
        this.tableDataSource.data = data;
        this.displayedColumns = data.length > 0 ? Object.keys((data[0] as any)) : [];
        if (!this.tableDataSource.sort) this.tableDataSource.sort = this.matSort;
        if (!this.tableDataSource.paginator) this.tableDataSource.paginator = this.matPaginator;
      });
    }

   

    ngOnDestroy(): void {
      this._destroy$.next();
      this._destroy$.complete();
    }

}
