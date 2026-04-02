import { Component } from '@angular/core';
import { PinCard } from '../../components/pin-card/pin-card';
import { Card } from '../../components/card/card';
import { BigCard } from '../../components/big-card/big-card';
import { ArticleCard } from '../../components/article-card/article-card';
import { Hospitals } from '../../components/hospitals/hospitals';
import { PrenotationBox } from '../../components/prenotation-box/prenotation-box';
import { Footer } from '../../components/footer/footer';

@Component({
  selector: 'conti-home',
  imports: [
    PinCard,
    Card,
    BigCard,
    ArticleCard,
    Hospitals,
    PrenotationBox,
    Footer,
  ],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  translateXvisits = 0;
  translateXarticles = 0;

  goRight(type: string) {
    if (type === 'visits') {
      if (this.translateXvisits > -680) {
        this.translateXvisits -= 340;
      }
    } else {
      if (this.translateXarticles > -920) {
        this.translateXarticles -= 340;
      }
    }
  }

  goLeft(type: string) {
    if (type === 'visits') {
      if (this.translateXvisits < 0) {
        this.translateXvisits += 340; // vai a sinistra → contenuto si sposta a destra
      }
    } else {
      if (this.translateXarticles < 0) {
        this.translateXarticles += 340; // vai a sinistra → contenuto si sposta a destra
      }
    }
  }
}
