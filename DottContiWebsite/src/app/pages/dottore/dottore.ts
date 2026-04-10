import { Component } from '@angular/core';
import { PinCard } from '../../components/pin-card/pin-card';
import { CurriculumVitae } from '../../components/curriculum-vitae/curriculum-vitae';
import { BigCard } from '../../components/big-card/big-card';
import { PrenotationBox } from '../../components/prenotation-box/prenotation-box';
import { Hospitals } from '../../components/hospitals/hospitals';

@Component({
  selector: 'dottore',
  imports: [PinCard, CurriculumVitae, BigCard, PrenotationBox, Hospitals],
  templateUrl: './dottore.html',
  styleUrl: './dottore.scss',
})
export class Dottore {}
