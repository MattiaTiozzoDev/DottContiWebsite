import { Component } from '@angular/core';
import { PinCard } from '../../components/pin-card/pin-card';
import { Card } from '../../components/card/card';

@Component({
  selector: 'conti-home',
  imports: [PinCard, Card],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {}
