import { Route } from '@angular/router';
import { LoginComponent } from "./pages/login/login.component";
import { guestGuard } from './guards/guest.guard';
import { RegisterComponent } from './pages/register/register.component';

// Define routes config for the auth module
export const authRoutes: Route[] = [
    {
    path: 'login', component: LoginComponent, canActivate: [guestGuard]
    }, {
     path: 'register', component: RegisterComponent
    }
];


