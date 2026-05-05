import { Component, OnInit } from '@angular/core';
import { PrenotationBox } from '../../components/prenotation-box/prenotation-box';
import { Accordion } from '../../components/accordion/accordion';
import { Visite } from '../../components/visite/visite';
import { Hospitals } from '../../components/hospitals/hospitals';
import { RevealDirective } from '../../directives/reveal.directive';
import { NavigationEnd, Router } from '@angular/router';
import { SeoService } from '../../services/seo.service';

@Component({
  selector: 'prestazioni',
  imports: [Accordion, PrenotationBox, Visite, Hospitals, RevealDirective],
  templateUrl: './prestazioni.html',
  styleUrl: './prestazioni.scss',
})
export class Prestazioni implements OnInit {
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
        'Prestazioni urologiche e andrologiche — Dr. Enrico Conti | Alba, La Spezia',
      description:
        'Visite specialistiche urologiche e andrologiche, ecografia prostatica, scrotale, renale e dell\'apparato urinario, trattamento della disfunzione erettile con onde d\'urto. Studi ad Alba (CN), La Spezia e Castelnuovo Magra (SP).',
      path: '/prestazioni',
      keywords:
        'prestazioni urologiche, prestazioni andrologiche, ecografia prostatica, ecografia scrotale, ecografia renale, onde d\'urto disfunzione erettile, SOLV-ED',
    });
  }
}
