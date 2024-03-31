import { Route } from '@angular/router';
import { ConverterPageComponent } from './features/converter-page/converter-page.component';
import { PageNotFoundComponent } from '@jsonConverter/ui-elements';
import { authGuard } from './core/auth/guards/auth.guard';

export const appRoutes: Route[] = [
    {
        path: '', pathMatch: "full",  component: ConverterPageComponent, canActivate: [authGuard] 
    }, {
        path: '404', component: PageNotFoundComponent,
    }, 
    {
        path: '**', redirectTo: '404', pathMatch: 'full'
    }
];
