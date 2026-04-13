import { Component, Input } from '@angular/core';
import { RevealDirective } from '../../directives/reveal.directive';

@Component({
  selector: 'accordion',
  imports: [RevealDirective],
  templateUrl: './accordion.html',
  styleUrl: './accordion.scss',
})
export class Accordion {
  @Input() text: string = '';

  isOpen = false;

  toggle() {
    this.isOpen = !this.isOpen;
  }
}
