import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ArticlesStore } from '../../services/articles.store';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-dashboard',
  imports: [FormsModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard {
  public title: string = '';
  public date: string = '';
  public references: string[] = [''];
  public article: string = '';
  public videoUrl: string = '';
  public error = '';
  public flagarticolo: boolean = true;

  constructor(
    private store: ArticlesStore,
    private toastService: ToastService,
  ) {}

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
    this.date = '';
    this.references = [''];
    this.article = '';
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
