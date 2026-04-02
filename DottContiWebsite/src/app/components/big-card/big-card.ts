import { Component, Input } from '@angular/core';

@Component({
  selector: 'big-card',
  imports: [],
  templateUrl: './big-card.html',
  styleUrl: './big-card.scss',
})
export class BigCard {
  @Input() title: string = '';
  @Input() img: string = '';
}
