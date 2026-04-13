import { Directive, ElementRef, Input, OnInit, OnDestroy } from '@angular/core';

@Directive({
  selector: '[revealDirective]',
})
export class RevealDirective implements OnInit, OnDestroy {
  @Input() delay: number = 0; // ms
  @Input() once: boolean = true; // animazione una sola volta

  private observer!: IntersectionObserver;

  constructor(private el: ElementRef) {}

  ngOnInit(): void {
    const element = this.el.nativeElement;

    // delay via style (più pulito del timeout)
    element.style.transitionDelay = `${this.delay}ms`;

    this.observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          element.classList.add('active');

          if (this.once) {
            this.observer.unobserve(element);
          }
        } else {
          if (!this.once) {
            element.classList.remove('active');
          }
        }
      },
      {
        threshold: 0.15,
      },
    );

    this.observer.observe(element);
  }

  ngOnDestroy(): void {
    if (this.observer) {
      this.observer.disconnect();
    }
  }
}
