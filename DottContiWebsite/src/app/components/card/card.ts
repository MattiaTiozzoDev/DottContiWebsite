import { Component, Input } from '@angular/core';

@Component({
  selector: 'card',
  imports: [],
  templateUrl: './card.html',
  styleUrl: './card.scss',
})
export class Card {
  @Input() title: string = '';
  @Input() img: string = '';
}
