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


  export interface ConverterConfigModel<T extends Record<string, any>> {
    useMemoized: boolean;
    value: T[];
  }