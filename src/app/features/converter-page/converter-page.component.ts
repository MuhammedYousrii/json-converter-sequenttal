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
   * Make call to notify method on the converter service whenever the User entered new valid JSON
   * 
   * @note to learn more about config that I passed to co
   * 
   * @param parsedJson 
   */
  public onValidJsonChange(parsedJson: any[]) {
    const notifyConfig: ConverterConfigModel<T> = {
      useMemoized: false,
      value: parsedJson
    }
    this.converterService.notify(notifyConfig).then();
  }

  /**
   * Patch active filters values
   */
  public onFilterChange(filters: FilterOptionModel[]) {
    this.converterService.patchActiveFilters(filters);
  }

}
