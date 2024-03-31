import { Route } from '@angular/router';
import { LoginComponent } from "./pages/login/login.component";
import { NotAuthComponent } from './pages/not-auth/not-auth.component';
import { guestGuard } from './guards/guest.guard';
import { RegisterComponent } from './pages/register/register.component';


export const authRoutes: Route[] = [
    {
        path: 'login', component: LoginComponent
    }, {
       path: 'register', component: RegisterComponent, 
    }, {
        path: '401', component: NotAuthComponent
    }
];


