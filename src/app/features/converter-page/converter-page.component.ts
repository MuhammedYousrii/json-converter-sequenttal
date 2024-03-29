import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JsonBoxComponent } from './json-box/json-box.component';
import { FilterBoxComponent, PaginationComponent, TableBodyComponent } from '@jsonConverter/ui-elements';


@Component({
  selector: 'app-converter-page',
  standalone: true,
  imports: [CommonModule, JsonBoxComponent, TableBodyComponent, PaginationComponent, FilterBoxComponent],
  templateUrl: './converter-page.component.html',
  styleUrl: './converter-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConverterPageComponent {}
