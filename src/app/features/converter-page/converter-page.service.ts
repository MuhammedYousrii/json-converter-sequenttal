import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, distinctUntilChanged, firstValueFrom, from, groupBy, lastValueFrom, map, mergeAll, mergeMap, of, switchMap, toArray } from 'rxjs';
import { ConverterConfigModel, FilterOptionModel } from './converter-page.models';

@Injectable({
  providedIn: 'root'
})
export class ConverterPageService<T extends Record<string, T>> {


  // Holds the parsed JSON records in the memory during the life cycle of the service.
  private _memoizedRecords: T[] = []; 


  // Don't struct available filters lists if records count less than the determined value.
  private _ENABLE_FILTERS_ON_COUNT = 3; 



  // Represent Store and Caster for the records that will be displayed in the table.
  readonly tableData$ = new BehaviorSubject<T[]>([]);


  // Represents the available filters list which is constructed based  on new entered parsed JSON.
  readonly availableFiltersList$ = new Subject<FilterOptionModel[]>();

  // Represents Store and Caster for the active filters selected by users.
  readonly activeFilters$ = new BehaviorSubject<FilterOptionModel[]>([]);


  /**
   * @description Act as Mediator Between different communicators.
   * It instructs the flow of data stream and calculations upon it 
   * 
   * @note As notify will be called on two  different occations,  
   * Once: The user entered a new valid JSON.
   * Once: The user selected a new filter.
   * 
   * so it requires instructions to know how to process.
   * 
   * 
   * @param config: ConverterConfigModel<T> -> { value: T[]; useMemoized: boolean; }
   * @returns Promise<void>
   */
  async notify({useMemoized, parsedJson}: ConverterConfigModel<T> = { parsedJson: this._getCache(), useMemoized: true }): Promise<void> {
    
    if (!useMemoized) { // Means the user entered a new valid JSON
      
      // cache the new parsed JSON
      // emit the new records to the tableData$ subject
      // struct available filters list based on the new parsed json
      // emit the available filters list to the availableFiltersList$ subject


      this._cache([...parsedJson]);
      this.tableData$.next(this._getCache());
      this.availableFiltersList$.next(await lastValueFrom(this._structAvailableFiltersList(this._getCache())));


      // Enable to disable filters till specific count of records
      // if (this._getCache().length <= this._ENABLE_FILTERS_ON_COUNT) return;

    } else if (useMemoized) {// Means the user selected a new filter 

      // Filter the cached records based on the activated filters
      // emit the new records to the tableData$ subject
      this.tableData$.next(await firstValueFrom(this._filterRecords({ records: this._getCache() })));
  
    } 
    
  }


  /**
   * Patch the existed active filters with the newly selected filters
   * also it make sure there is no duplicated filters
   * then it emit the new active filters to the activeFilters$ subject
   * call notify method to filter the records based on the new filters
   * 
   * @param filters
   * @returns void
   */ 
  public patchActiveFilters(filters: FilterOptionModel[]) {
    let updatedFilers = [...this.activeFilters$.value, ...filters];
    updatedFilers = Array.from(new Map(updatedFilers.map(filter => [filter.key, filter])).values() as any);
    this.activeFilters$.next(updatedFilers);
    this.notify();
  }
  
  /**
   * Struct the filters list based on available parsed JSON records
   * 
   * @param records  Array<T> -> Array of parsed JSON records
   * @returns Observable<FilterOptionModel[]>
  */
  private _structAvailableFiltersList(records: T[]): Observable<FilterOptionModel[]> {
    return of(...records).pipe(
      map(record => Object.entries(record)),
      mergeAll(),
      map(([key, value]) => ({ key, value })),
      toArray(),
      map(items =>
        Object.entries(
          items.reduce((acc, curr) => {
            acc[curr.key] = [...(acc[curr.key] || []), curr.value];
            return acc;
          }, {} as { [key: string]: any[] }),
        ).map(([key, values]) => ({ key, values: [...new Set(values)] })),
      ),
    );
  }

  /**
   * 
   * It takes list of records and filter them based on a specific list of active filters.
   * It works as AND search, which means the record should pass all the filters to be included.
   * 
   * @returns Observable<T[]> -> filtered records
  */
  private _filterRecords<T>({ records }: { records: T[]; }): Observable<T[]> {
    return of(records as T[]).pipe(
      switchMap(records => from(this.activeFilters$).pipe(
        map(filters => {
          return records.filter(record => {
            return filters.every(filter => {
              if (filter.values.length === 0) return true;
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
