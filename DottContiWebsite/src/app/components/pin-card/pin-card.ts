import { Component, Input } from '@angular/core';

@Component({
  selector: 'pin-card',
  imports: [],
  templateUrl: './pin-card.html',
  styleUrl: './pin-card.scss',
})
export class PinCard {
  @Input() title: string = '';
  @Input() address: string = '';
  @Input() city: string = '';
  @Input() link: string = '';
}
