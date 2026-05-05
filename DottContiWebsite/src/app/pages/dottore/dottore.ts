import { Component, OnInit } from '@angular/core';
import { PinCard } from '../../components/pin-card/pin-card';
import { CurriculumVitae } from '../../components/curriculum-vitae/curriculum-vitae';
import { BigCard } from '../../components/big-card/big-card';
import { PrenotationBox } from '../../components/prenotation-box/prenotation-box';
import { Hospitals } from '../../components/hospitals/hospitals';
import { RevealDirective } from '../../directives/reveal.directive';
import { NavigationEnd, Router } from '@angular/router';
import { SeoService } from '../../services/seo.service';

@Component({
  selector: 'dottore',
  imports: [
    PinCard,
    CurriculumVitae,
    BigCard,
    PrenotationBox,
    Hospitals,
    RevealDirective,
  ],
  templateUrl: './dottore.html',
  styleUrl: './dottore.scss',
})
export class Dottore implements OnInit {
  constructor(private router: Router, private seo: SeoService) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        window.scrollTo(0, 0);

        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
      }
    });
  }

  ngOnInit(): void {
    this.seo.setPage({
      title:
        'Dr. Enrico Conti — Curriculum dell\'urologo e andrologo | Alba e La Spezia',
      description:
        'Curriculum del Dr. Enrico Conti, urologo e andrologo: oltre 30 anni di esperienza clinica, formazione, attività editoriale e specializzazioni. Riceve ad Alba (CN), La Spezia e Castelnuovo Magra (SP).',
      path: '/il-dottore',
      keywords:
        'Dr. Enrico Conti curriculum, urologo esperto, andrologo esperto, specialista salute maschile',
    });
  }
}
