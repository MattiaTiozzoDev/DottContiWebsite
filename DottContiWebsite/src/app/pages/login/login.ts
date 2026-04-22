import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'login',
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  public email: any;
  public password: any;

  constructor(
    private readonly authService: AuthService,
    private router: Router,
  ) {}

  async login() {
    try {
      const res = await this.authService.login(this.email, this.password);
      console.log(res);

      // se arrivi qui → login riuscito
      this.router.navigate(['/dashboard']);
    } catch (err) {
      console.error('Login fallito', err);
    }
  }
}
