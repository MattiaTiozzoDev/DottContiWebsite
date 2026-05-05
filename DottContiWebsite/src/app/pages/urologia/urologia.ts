import { Component, OnInit } from '@angular/core';
import { Accordion } from '../../components/accordion/accordion';
import { PrenotationBox } from '../../components/prenotation-box/prenotation-box';
import { RevealDirective } from '../../directives/reveal.directive';
import { NavigationEnd, Router } from '@angular/router';
import { SeoService } from '../../services/seo.service';

@Component({
  selector: 'app-urologia',
  imports: [Accordion, PrenotationBox, RevealDirective],
  templateUrl: './urologia.html',
  styleUrl: './urologia.scss',
})
export class Urologia implements OnInit {
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
        'Urologo ad Alba, La Spezia e Castelnuovo Magra — Dr. Enrico Conti',
      description:
        'Visita urologica con il Dr. Enrico Conti: diagnosi e cura delle patologie dell\'apparato urinario, della prostata, infezioni urinarie e disturbi minzionali. Studi ad Alba (CN), La Spezia e Castelnuovo Magra (SP).',
      path: '/urologia',
      keywords:
        'visita urologica, urologo Alba, urologo La Spezia, prostata, ecografia prostatica, calcoli renali, infezioni urinarie',
    });
  }
}
