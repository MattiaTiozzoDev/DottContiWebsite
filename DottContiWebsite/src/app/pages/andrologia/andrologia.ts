import { Component, OnInit } from '@angular/core';
import { Accordion } from '../../components/accordion/accordion';
import { PrenotationBox } from '../../components/prenotation-box/prenotation-box';
import { RevealDirective } from '../../directives/reveal.directive';
import { NavigationEnd, Router } from '@angular/router';
import { SeoService } from '../../services/seo.service';

@Component({
  selector: 'andrologia',
  imports: [Accordion, PrenotationBox, RevealDirective],
  templateUrl: './andrologia.html',
  styleUrl: './andrologia.scss',
})
export class Andrologia implements OnInit {
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
        'Andrologo ad Alba, La Spezia e Castelnuovo Magra — Dr. Enrico Conti',
      description:
        'Visita andrologica con il Dr. Enrico Conti: diagnosi e trattamento di disfunzione erettile, infertilità maschile e patologie del pene. Studi ad Alba (CN), La Spezia e Castelnuovo Magra (SP).',
      path: '/andrologia',
      keywords:
        'visita andrologica, andrologo Alba, andrologo La Spezia, disfunzione erettile, infertilità maschile, salute sessuale maschile',
    });
  }
}
