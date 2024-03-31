import { Injectable, inject, signal } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword, user, signOut} from '@angular/fire/auth';
import { Observable, from } from 'rxjs';
import { UserModel } from './auth.models';
@Injectable({
  providedIn: 'root'
})
export class AuthService {


  readonly firebaseAuth: Auth = inject(Auth);
  readonly user$ = user(this.firebaseAuth);
  currentUserSig = signal<UserModel | null | undefined>(undefined);

  register(email: string, username: string, password: string): Observable<void> {
      return from(createUserWithEmailAndPassword(this.firebaseAuth, email, password).then((userCredential) => { 
        updateProfile(userCredential.user, {displayName: username})
      }));
  }

  login(email: string, password: string): Observable<void> {
    return from(signInWithEmailAndPassword(this.firebaseAuth, email, password).then(() => {}));
  }


  logout():  Observable<void> {
    return from(signOut(this.firebaseAuth).then(() => {}));
  }
}

