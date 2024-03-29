import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ui-table-body',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './table-body.component.html',
  styleUrl: './table-body.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableBodyComponent {}
