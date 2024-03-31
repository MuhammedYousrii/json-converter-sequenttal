import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SpinnerComponent } from '@jsonConverter/ui-elements';
import { UserPanelComponent } from './core/auth/components/user-panel/user-panel.component';

@Component({
  standalone: true,
  imports: [RouterModule, SpinnerComponent, UserPanelComponent],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styles: [],
})
export class AppComponent {



}
