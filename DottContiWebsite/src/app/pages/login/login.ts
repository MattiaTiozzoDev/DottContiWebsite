import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { SeoService } from '../../services/seo.service';

@Component({
  selector: 'login',
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login implements OnInit {
  public email: any;
  public password: any;

  constructor(
    private readonly authService: AuthService,
    private router: Router,
    private seo: SeoService,
  ) {}

  ngOnInit(): void {
    this.seo.setPage({
      title: 'Login — Dr. Enrico Conti',
      description: 'Area riservata.',
      path: '/login',
      noIndex: true,
    });
  }

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
