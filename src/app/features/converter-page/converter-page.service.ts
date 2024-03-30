import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, distinctUntilChanged, firstValueFrom, from, groupBy, lastValueFrom, map, mergeAll, mergeMap, of, switchMap, toArray } from 'rxjs';
import { ConverterConfigModel, FilterOptionModel } from './converter-page.models';

@Injectable({
  providedIn: 'root'
})
export class ConverterPageService<T extends Record<string, T>> {


  private _memoizedRecords: T[] = [];


  readonly tableData$ = new BehaviorSubject<T[]>([]);
  readonly availableFiltersList$ = new Subject<FilterOptionModel[]>();


  readonly activeFilters$ = new BehaviorSubject<FilterOptionModel[]>([]);


  /**
   * Notify the subscribers with the updated records and filters
   * 
   * @param config
   * @returns Promise<void>
   */
  async notify(config: ConverterConfigModel<T> = { value: this._getCache(), useMemoized: true }) {
    if (!config.useMemoized) {
      const records = [...config.value];
      this._cache(records);
      this.tableData$.next(records);

      const availableFilters = await lastValueFrom(this._createFiltersList(records));
      this.availableFiltersList$.next(availableFilters);
    } else {
      const filteredRecords = await firstValueFrom(this._filterRecords(this._getCache()));
      this.tableData$.next(filteredRecords);
    }
  }


  /**
   * Patch the active filters
   * 
   * @param filters
   * @returns void
   */ 
  public patchActiveFilters(filters: FilterOptionModel[]) {
    let updatedFilers = [...this.activeFilters$.value, ...filters];
    updatedFilers = Array.from(new Map(updatedFilers.map(filter => [filter.key, filter])).values() as any);
    this.activeFilters$.next(updatedFilers);
    this.notify().then();
  }
  
  /**
   * Struct the filters list based on the records
   * 
   * @param records 
   * @returns Observable<FilterOptionModel[]>
  */
  private _createFiltersList(records: T[]): Observable<FilterOptionModel[]> {
    return of(records).pipe(
      distinctUntilChanged(),
      mergeAll(),
      map(record => Object.entries(record)),
      mergeAll(),
      groupBy(([key, _]) => key),
      mergeMap(
        group$ => group$.pipe(
        map(([key, value]) => ({ key, value })),
        toArray(),
        map(items => ({
          key: items[0].key,
          values: Array.from(new Set(items.map(item => item.value)))
        }))
      )),
      toArray(),
  );


  }

  /**
   * Filter the records based on the activated filters which is saved inside FiltersConfig$
   * 
   * @param filters$ 
   * @param records$ 
   * @returns Observable<any[]>
  */
  private _filterRecords<T>(records: T[]): Observable<T[]> {
    return of(records as T[]).pipe(
      switchMap(records => from(this.activeFilters$).pipe(
        map(filters => {
          return records.filter(record => {
            return filters.every(filter => {
              return filter.values.includes((record as any)[filter.key]);
            });
          });
        })
      )),
    );
  }


  private _cache(dataToCache: T[]) {
    this._memoizedRecords = [...dataToCache];
  } 

  private _getCache(): T[] { 
    return JSON.parse(JSON.stringify(this._memoizedRecords));
  }
}
