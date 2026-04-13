import { Component } from '@angular/core';
import { Accordion } from '../../components/accordion/accordion';
import { PrenotationBox } from '../../components/prenotation-box/prenotation-box';
import { RevealDirective } from '../../directives/reveal.directive';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-urologia',
  imports: [Accordion, PrenotationBox, RevealDirective],
  templateUrl: './urologia.html',
  styleUrl: './urologia.scss',
})
export class Urologia {
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
