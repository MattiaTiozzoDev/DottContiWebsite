import { Component } from '@angular/core';

@Component({
  selector: 'curriculum-vitae',
  imports: [],
  templateUrl: './curriculum-vitae.html',
  styleUrl: './curriculum-vitae.scss',
})
export class CurriculumVitae {
  isOpen = false;

  toggleCv() {
    this.isOpen = !this.isOpen;
  }
}
