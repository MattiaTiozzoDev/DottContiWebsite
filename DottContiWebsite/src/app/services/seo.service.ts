import { Injectable, Inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';

export interface SeoPage {
  title: string;
  description: string;
  /** path relativo (es. "/articoli", "/articolo/abc123"). Se omesso, usa l'URL corrente. */
  path?: string;
  /** URL assoluto immagine social. Default: home_dott_conti.svg */
  image?: string;
  /** keywords aggiuntive (vengono aggiunte a quelle base) */
  keywords?: string;
  /** se true imposta noindex (es. login, dashboard) */
  noIndex?: boolean;
}

@Injectable({ providedIn: 'root' })
export class SeoService {
  /** Cambia qui il dominio finale di produzione */
  private readonly baseUrl = 'https://www.dottenricoconti.it';
  private readonly defaultImage = `${this.baseUrl}/assets/img/home_dott_conti.svg`;
  private readonly baseKeywords =
    "urologo Alba, andrologo Alba, urologo La Spezia, andrologo La Spezia, urologo Castelnuovo Magra, andrologo Castelnuovo Magra, Dr. Enrico Conti";

  constructor(
    private title: Title,
    private meta: Meta,
    @Inject(DOCUMENT) private doc: Document,
  ) {}

  setPage(page: SeoPage): void {
    this.title.setTitle(page.title);

    const description = page.description;
    const url =
      this.baseUrl + (page.path ?? this.doc.location?.pathname ?? '/');
    const image = page.image ?? this.defaultImage;
    const keywords = page.keywords
      ? `${this.baseKeywords}, ${page.keywords}`
      : this.baseKeywords;

    this.upsert('name', 'description', description);
    this.upsert('name', 'keywords', keywords);
    this.upsert(
      'name',
      'robots',
      page.noIndex
        ? 'noindex, nofollow'
        : 'index, follow, max-image-preview:large',
    );

    // Open Graph
    this.upsert('property', 'og:title', page.title);
    this.upsert('property', 'og:description', description);
    this.upsert('property', 'og:url', url);
    this.upsert('property', 'og:image', image);
    this.upsert('property', 'og:type', 'website');
    this.upsert('property', 'og:locale', 'it_IT');

    // Twitter
    this.upsert('name', 'twitter:card', 'summary_large_image');
    this.upsert('name', 'twitter:title', page.title);
    this.upsert('name', 'twitter:description', description);
    this.upsert('name', 'twitter:image', image);

    this.setCanonical(url);
  }

  private upsert(attr: 'name' | 'property', key: string, value: string): void {
    const selector = `${attr}="${key}"`;
    if (this.meta.getTag(selector)) {
      this.meta.updateTag({ [attr]: key, content: value } as any, selector);
    } else {
      this.meta.addTag({ [attr]: key, content: value } as any);
    }
  }

  private setCanonical(url: string): void {
    let link: HTMLLinkElement | null = this.doc.querySelector(
      "link[rel='canonical']",
    );
    if (!link) {
      link = this.doc.createElement('link');
      link.setAttribute('rel', 'canonical');
      this.doc.head.appendChild(link);
    }
    link.setAttribute('href', url);
  }
}
