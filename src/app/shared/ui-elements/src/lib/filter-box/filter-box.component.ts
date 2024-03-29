import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ui-filter-box',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './filter-box.component.html',
  styleUrl: './filter-box.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilterBoxComponent {}
