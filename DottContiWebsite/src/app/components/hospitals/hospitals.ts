import { Component } from '@angular/core';
import { RevealDirective } from '../../directives/reveal.directive';

@Component({
  selector: 'hospitals',
  imports: [RevealDirective],
  templateUrl: './hospitals.html',
  styleUrl: './hospitals.scss',
})
export class Hospitals {}
