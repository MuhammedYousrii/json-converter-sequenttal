import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JsonBoxComponent } from './json-box/json-box.component';
import { FilterBoxComponent, PaginationComponent, TableBodyComponent } from '@jsonConverter/ui-elements';
import { ConverterPageService } from './converter-page.service';
import { ConverterConfigModel, FilterOptionModel } from './converter-page.models';


@Component({
  selector: 'app-converter-page',
  standalone: true,
  imports: [CommonModule, JsonBoxComponent, TableBodyComponent, PaginationComponent, FilterBoxComponent],
  templateUrl: './converter-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})


export class ConverterPageComponent<T extends Record<string, any>> {

  public converterService: ConverterPageService<any> = inject(ConverterPageService);


  /**
   * Make a call to notify method on the converter service whenever the User entered new valid JSON
   * 
   * @param parsedJson 
   */
  public onValidJsonChange(parsedJson: any[]) {
    const notifyConfig: ConverterConfigModel<T> = {
      useMemoized: false,
      parsedJson
    }
    this.converterService.notify(notifyConfig).then();
  }

  /**
   * Make a all to patchActiveFilters method on the converter service 
   * whenever the User changes the filter
   * 
   * @param filters
   */
  public onFilterChange(filters: FilterOptionModel[]) {
    this.converterService.patchActiveFilters(filters);
  }

}
