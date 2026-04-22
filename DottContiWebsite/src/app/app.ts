import { Component, HostListener, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from './components/navbar/navbar';
import { ArticlesStore } from './services/articles.store';
import { Loader } from './components/loader/loader';
import { Toast } from './components/toast/toast';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar, Loader, Toast],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App implements OnInit {
  constructor(private store: ArticlesStore) {}
  ngOnInit(): void {
    this.store.loadArticles();
    this.store.loadVideos();
  }
}
