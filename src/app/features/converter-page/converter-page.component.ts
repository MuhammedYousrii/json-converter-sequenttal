import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JsonBoxComponent } from './json-box/json-box.component';
import { FilterBoxComponent, PaginationComponent, TableBodyComponent } from '@jsonConverter/ui-elements';
import { ConverterPageService } from './converter-page.service';
import { FilterOptionModel } from './converter-page.models';
import { AuthService } from 'src/app/core/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-converter-page',
  standalone: true,
  imports: [CommonModule, JsonBoxComponent, TableBodyComponent, PaginationComponent, FilterBoxComponent],
  templateUrl: './converter-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})


export class ConverterPageComponent {

  public converterService: ConverterPageService<any> = inject(ConverterPageService);


  /**
   * Call the converter service to notify all interested listeners for the new parsed JSON
   * @param parsedJson 
   */
  public onValidJsonChange(parsedJson: any[]) {
    this.converterService.notify({
      useMemoized: false,
      value: parsedJson
    }).then(() => console.log('Parsed JSON has been updated'));
  }

  /**
   * Patch active filters values
   */
  public onFilterChange(filters: FilterOptionModel[]) {
    console.log(filters);
    this.converterService.patchActiveFilters(filters);
  }

}
