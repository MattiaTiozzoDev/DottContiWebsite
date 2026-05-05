import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ArticlesStore } from '../../services/articles.store';
import { ToastService } from '../../services/toast.service';
import { SeoService } from '../../services/seo.service';

@Component({
  selector: 'app-dashboard',
  imports: [FormsModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard implements OnInit {
  public title: string = '';
  public subtitle: string = '';
  public date: string = '';
  public references: string[] = [''];
  public article: string = '';
  public videoUrl: string = '';
  public error = '';
  public flagarticolo: boolean = true;
  public showPreview: boolean = false;

  @ViewChild('articleArea') articleArea?: ElementRef<HTMLTextAreaElement>;

  constructor(
    private store: ArticlesStore,
    private toastService: ToastService,
    private seo: SeoService,
  ) {}

  ngOnInit(): void {
    this.seo.setPage({
      title: 'Dashboard — Dr. Enrico Conti',
      description: 'Area riservata di amministrazione.',
      path: '/dashboard',
      noIndex: true,
    });
  }

  /** Wrappa la selezione corrente con `**...**` (grassetto) */
  insertBold() {
    const ta = this.articleArea?.nativeElement;
    if (!ta) return;
    const start = ta.selectionStart ?? this.article.length;
    const end = ta.selectionEnd ?? this.article.length;
    const before = this.article.substring(0, start);
    const selected = this.article.substring(start, end);
    const after = this.article.substring(end);
    if (selected.length > 0) {
      this.article = `${before}**${selected}**${after}`;
      const newPos = start + 2 + selected.length + 2;
      setTimeout(() => {
        ta.focus();
        ta.setSelectionRange(newPos, newPos);
      });
    } else {
      this.article = `${before}****${after}`;
      const newPos = start + 2;
      setTimeout(() => {
        ta.focus();
        ta.setSelectionRange(newPos, newPos);
      });
    }
  }

  /** Inserisce `$$` alla posizione corrente del cursore (nuovo paragrafo) */
  insertParagraph() {
    const ta = this.articleArea?.nativeElement;
    if (!ta) return;
    const start = ta.selectionStart ?? this.article.length;
    const end = ta.selectionEnd ?? this.article.length;
    const before = this.article.substring(0, start);
    const after = this.article.substring(end);
    this.article = `${before}$$${after}`;
    const newPos = start + 2;
    setTimeout(() => {
      ta.focus();
      ta.setSelectionRange(newPos, newPos);
    });
  }

  togglePreview() {
    this.showPreview = !this.showPreview;
  }

  /** Genera HTML per l'anteprima: escape + paragrafi su `$$` + grassetto su **...** */
  get articlePreviewHtml(): string {
    if (!this.article) return '';
    const escapeHtml = (s: string) =>
      s
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
    return this.article
      .split('$$')
      .map((p) => {
        const safe = escapeHtml(p);
        const withBold = safe.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
        return `<p>${withBold}</p>`;
      })
      .join('');
  }

  addReference() {
    this.references.push('');
  }

  removeReference(index: number) {
    this.references.splice(index, 1);
  }

  async onSubmit() {
    var now = new Date();
    const payload = {
      title: this.title,
      subtitle: this.subtitle,
      date: this.date,
      references: this.references,
      article: this.article,
      createdAt: now.toDateString(),
    };

    try {
      console.log(payload);
      await this.store.addArticle(payload);

      console.log('Salvato su Firestore');
      this.toastService.success('Articolo aggiunto con successo!');
      this.resetForm();
    } catch (err) {
      console.error(err);
      this.toastService.error("Errore nell'aggiunta dell'articolo!");
      this.error = JSON.stringify(err);
    }
  }

  resetForm() {
    this.title = '';
    this.subtitle = '';
    this.date = '';
    this.references = [''];
    this.article = '';
    this.showPreview = false;
  }

  async onSubmitVideo() {
    const payload = {
      url: this.videoUrl,
    };
    if (!this.isValidUrl(this.videoUrl)) {
      this.toastService.error(
        'URL non valido! Deve essere un link di YouTube.',
      );
      return;
    }
    try {
      console.log(payload);
      await this.store.addVideo(payload);
      this.toastService.success('Video aggiunto con successo!');
      console.log('Salvato su Firestore');

      this.videoUrl = '';
    } catch (err) {
      console.error(err);
      this.toastService.error("Errore nell'aggiunta del video!");
      this.error = JSON.stringify(err);
    }
  }

  isValidUrl(url: string): boolean {
    return url.startsWith('https://www.youtube.com');
  }
}
