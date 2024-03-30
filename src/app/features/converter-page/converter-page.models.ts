export interface PaginationConfigModel {
    pageIndex?: number;
    pageSize?: number;
    totalPages?: number;
    totalRecords?: number;
  }
  
  export interface FilterOptionModel {
    key: string;
    values: any[];
  }


  export interface ConverterConfigModel<T> {
    useMemoized: boolean;
    value: T[];
  }