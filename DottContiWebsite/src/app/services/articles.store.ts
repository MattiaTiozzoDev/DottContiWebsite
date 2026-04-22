import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
} from '@angular/fire/firestore';
import { BehaviorSubject, map } from 'rxjs';
import { art } from './articles';

export interface Article {
  id?: string;
  title?: string;
  date?: string;
  references?: string[];
  article?: string;
  createdAt: string;
}

@Injectable({
  providedIn: 'root',
})
export class ArticlesStore {
  private articlesSubject = new BehaviorSubject<Article[]>([]);
  public articles$ = this.articlesSubject.asObservable();
  private videosSubject = new BehaviorSubject<any[]>([]);
  public videos$ = this.videosSubject.asObservable();

  constructor(private firestore: Firestore) {}

  // carica da Firebase e salva nello store
  async loadArticles() {
    try {
      const ref = collection(this.firestore, 'articles');
      const snapshot = await getDocs(ref);

      const articles = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Article[];
      console.log(articles);
      this.articlesSubject.next(articles);
    } catch (err) {
      console.error('Errore caricamento articoli:', err);
    }
  }

  async loadVideos() {
    try {
      const ref = collection(this.firestore, 'videos');
      const snapshot = await getDocs(ref);

      const videos = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Article[];
      console.log(videos);
      this.videosSubject.next(videos);
    } catch (err) {
      console.error('Errore caricamento video:', err);
    }
  }

  // aggiunge articolo (Firebase + store)
  async addArticle(article: Article) {
    const ref = collection(this.firestore, 'articles');
    const docRef = await addDoc(ref, article);

    // aggiornamento locale immediato (opzionale)
    const current = this.articlesSubject.value;
    this.articlesSubject.next([...current, { ...article, id: docRef.id }]);
  }

  // aggiunge video (Firebase + store)
  async addVideo(video: any) {
    let videoUrl = this.extractYouTubeId(video.url);
    const ref = collection(this.firestore, 'videos');
    const docRef = await addDoc(ref, { ...video, url: videoUrl });

    // aggiornamento locale immediato (opzionale)
    const current = this.videosSubject.value;
    this.videosSubject.next([...current, { ...video, id: docRef.id }]);
  }

  getArticleById(id: string) {
    return this.articles$.pipe(
      map((articles) => articles.find((a) => a.id === id)),
    );
  }

  getVideoById(id: string) {
    return this.videos$.pipe(map((videos) => videos.find((v) => v.id === id)));
  }

  async deleteArticle(id: string) {
    try {
      const ref = doc(this.firestore, 'articles', id);
      await deleteDoc(ref);

      // aggiorna lo store locale
      const current = this.articlesSubject.value;
      this.articlesSubject.next(current.filter((a) => a.id !== id));
    } catch (err) {
      console.error('Errore eliminazione articolo:', err);
    }
  }

  async deleteVideo(id: string) {
    try {
      const ref = doc(this.firestore, 'videos', id);
      await deleteDoc(ref);

      // aggiorna lo store locale
      const current = this.videosSubject.value;
      this.videosSubject.next(current.filter((v) => v.id !== id));
    } catch (err) {
      console.error('Errore eliminazione video:', err);
    }
  }

  extractYouTubeId(url: string): string {
    const regExp =
      /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/;
    const match = url.match(regExp);
    return match ? `https://www.youtube.com/embed/${match[1]}` : '';
  }
}
