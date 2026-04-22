import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'conti-navbar',
  imports: [RouterLink, RouterLinkActive, AsyncPipe],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar {
  constructor(public authservice: AuthService) {}

  public lang: string = 'IT';

  openNavbar() {
    const burger: HTMLElement | null = document.querySelector('.burger');
    const nav: HTMLElement | null = document.querySelector('.nav-links');
    const navLinks: NodeListOf<HTMLElement> | null =
      document.querySelectorAll('.nav-links li');
    //Toggle nav
    nav!.classList.toggle('nav-active');

    //animate Links
    navLinks.forEach((link, index) => {
      if (link.style.animation) {
        link.style.animation = '';
      } else {
        var width = document.body.clientWidth;
        if (width < 700) {
          link.style.animation = `navLinkFade 0.5s ease forwards ${index / 2 + 0.5}s`;
        }
      }
    });

    //burger animation
    burger!.classList.toggle('toggle');
  }

  changeLanguage($event: any) {
    let value = $event.target.value;
    localStorage.setItem('lang', value);
    window.location.reload();
  }

  ngOnInit(): void {
    this.lang = localStorage.getItem('lang') || 'it';
  }
}
