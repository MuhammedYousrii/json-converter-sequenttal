import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-not-auth',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './not-auth.component.html',
  styleUrl: './not-auth.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotAuthComponent {}
