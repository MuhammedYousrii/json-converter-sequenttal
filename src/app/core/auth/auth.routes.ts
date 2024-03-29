import { Route } from '@angular/router';
import { LoginComponent } from "./pages/login/login.component";
import { NotAuthComponent } from './pages/not-auth/not-auth.component';
import { guestGuard } from './guards/guest.guard';


export const authRoutes: Route[] = [
    {
        path: '', component: LoginComponent, canActivate: [guestGuard]
    }, {
        path: '401', component: NotAuthComponent, canActivate: [guestGuard]
    }
];


