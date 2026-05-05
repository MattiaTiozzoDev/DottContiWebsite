import { Component, OnInit } from '@angular/core';
import { PinCard } from '../../components/pin-card/pin-card';
import { NavigationEnd, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { LoadingService } from '../../services/loading.service';
import { ToastService } from '../../services/toast.service';
import { SeoService } from '../../services/seo.service';

@Component({
  selector: 'contatti',
  imports: [ReactiveFormsModule, PinCard],
  templateUrl: './contatti.html',
  styleUrl: './contatti.scss',
})
export class Contatti implements OnInit {
  form: FormGroup;

  loading = false;
  success = false;
  error = false;

  constructor(
    private router: Router,
    private http: HttpClient,
    private fb: FormBuilder,
    public loadingService: LoadingService,
    public toastService: ToastService,
    private seo: SeoService,
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

  ngOnInit(): void {
    this.seo.setPage({
      title:
        'Contatti Dr. Enrico Conti — Urologo e Andrologo ad Alba, La Spezia, Castelnuovo Magra',
      description:
        'Prenota una visita urologica o andrologica con il Dr. Enrico Conti. Sedi: Poliambulatorio San Paolo Alba (CN), Centro Medico Due Soli La Spezia, Centro Medico Monsignori Castelnuovo Magra (SP).',
      path: '/contatti',
      keywords:
        'prenota visita urologica, prenota visita andrologica, contatti Dr. Enrico Conti, studio medico Alba, studio medico La Spezia',
    });
  }

  sendMail() {
    if (this.form.invalid) return;

    this.loadingService.show();
    this.success = false;
    this.error = false;

    this.http
      .post(
        'https://us-central1-dottenricocontiwebsite.cloudfunctions.net/sendContactMail',
        this.form.value,
        { responseType: 'text' },
      )
      .subscribe({
        next: () => {
          this.loadingService.hide();
          this.toastService.success('Messaggio inviato con successo!');
          this.success = true;
          this.form.reset();
        },
        error: () => {
          this.toastService.error(
            "Errore nell'invio del messaggio. Riprova più tardi.",
          );
          this.loadingService.hide();
          this.error = true;
        },
      });
  }
}
