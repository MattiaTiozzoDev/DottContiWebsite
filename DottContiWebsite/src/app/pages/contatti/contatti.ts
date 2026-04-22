import { Component } from '@angular/core';
import { PinCard } from '../../components/pin-card/pin-card';
import { NavigationEnd, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'contatti',
  imports: [ReactiveFormsModule, PinCard],
  templateUrl: './contatti.html',
  styleUrl: './contatti.scss',
})
export class Contatti {
  form: FormGroup;

  loading = false;
  success = false;
  error = false;

  constructor(
    private router: Router,
    private http: HttpClient,
    private fb: FormBuilder,
  ) {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      subject: ['', [Validators.required, Validators.minLength(3)]],
      message: ['', [Validators.required, Validators.minLength(10)]],
    });

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        window.scrollTo(0, 0);
      }
    });
  }

  sendMail() {
    if (this.form.invalid || this.loading) return;

    this.loading = true;
    this.success = false;
    this.error = false;

    this.http.post('URL_DELLA_FUNCTION', this.form.value).subscribe({
      next: () => {
        this.loading = false;
        this.success = true;
        this.form.reset();
      },
      error: () => {
        this.loading = false;
        this.error = true;
      },
    });
  }
}
