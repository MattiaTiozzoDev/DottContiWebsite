import { Component } from '@angular/core';
import { PrenotationBox } from '../../components/prenotation-box/prenotation-box';
import { Accordion } from '../../components/accordion/accordion';
import { Visite } from '../../components/visite/visite';
import { Hospitals } from '../../components/hospitals/hospitals';
import { RevealDirective } from '../../directives/reveal.directive';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'prestazioni',
  imports: [Accordion, PrenotationBox, Visite, Hospitals, RevealDirective],
  templateUrl: './prestazioni.html',
  styleUrl: './prestazioni.scss',
})
export class Prestazioni {
  constructor(private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        window.scrollTo(0, 0);

        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
      }
    });
  }
}
