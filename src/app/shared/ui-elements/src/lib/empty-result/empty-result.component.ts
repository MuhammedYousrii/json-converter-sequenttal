import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ui-empty-result',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './empty-result.component.html',
  styleUrl: './empty-result.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmptyResultComponent {}
