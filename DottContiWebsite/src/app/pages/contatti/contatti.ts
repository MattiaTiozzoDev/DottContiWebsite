import { Component } from '@angular/core';
import { PinCard } from '../../components/pin-card/pin-card';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'contatti',
  imports: [PinCard],
  templateUrl: './contatti.html',
  styleUrl: './contatti.scss',
})
export class Contatti {
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
