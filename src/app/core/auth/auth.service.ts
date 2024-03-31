import { Injectable, inject } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword, user, signOut, UserCredential} from '@angular/fire/auth';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthService {


  // Injecting the required dependents.
  private _firebaseAuth: Auth = inject(Auth);
  private _router: Router = inject(Router);


  readonly user$ = user(this._firebaseAuth); // => Observable<User | null>



  /**
   * Register a new user.
   * 
   * @note Check @angular/fire docs for more information
   * 
   * @param email 
   * @param username 
   * @param password 
   * @returns {Promise<UserCredential>}
   */
  public register(email: string, username: string, password: string): Promise<UserCredential> {
      return createUserWithEmailAndPassword(this._firebaseAuth, email, password)
      .then((userCredential) => { 
        updateProfile(userCredential.user, {displayName: username}) 
        return userCredential
      });
  }


  /**
   * Login an existed users.
   * 
   * @note Check @angular/fire docs for more information
   * 
   * @param email 
   * @param password 
   * @returns {Promise<UserCredential>}
   */
  public login(email: string, password: string): Promise<UserCredential> {
    return signInWithEmailAndPassword(this._firebaseAuth, email, password);
  }


  // Logout the current user.
  public logout():  Promise<void> {
    return signOut(this._firebaseAuth);
  }


  public navigateToLoginPage(): void {
    this._router.navigateByUrl('auth/login');
  }

  public navigateToHomePage(): void {
    this._router.navigateByUrl('converter');
  }

  public navigateToRegisterPage(): void {
    this._router.navigateByUrl('auth/register');
  }

}

