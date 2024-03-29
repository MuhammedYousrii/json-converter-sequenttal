import { Route } from '@angular/router';
import { ConverterPageComponent } from './features/converter-page/converter-page.component';
import { PageNotFoundComponent } from '@jsonConverter/ui-elements';
import { authGuard } from './core/auth/guards/auth.guard';

export const appRoutes: Route[] = [
    {
        path: '', component: ConverterPageComponent, canActivate: [authGuard] 
    }, {
        path: 'auth', loadChildren: () => import('./core/auth/auth.routes').then(routes => routes.authRoutes)
    }, {
        path: '**', component: PageNotFoundComponent,
    }
];
