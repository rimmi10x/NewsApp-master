import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { LoadAllNewsQuery } from '../../../../usecases/News/LoadAllNews/LoadAllNewsQuery';
import { Observable } from 'rxjs';
import { News } from '../../../../domain/News/News';
import { selectAllNews, selectNewsIsLoading } from '../../../../usecases/News/news-store';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  public news$: Observable<News[]> | undefined;
  public isLoading$: Observable<boolean | null> | undefined;

  constructor(private readonly store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(new LoadAllNewsQuery());
    this.isLoading$ = this.store.select(selectNewsIsLoading);

    this.isLoading$.subscribe((next) => {
      if (next === false) {
        this.news$ = this.store.select(selectAllNews);
      }
    });
  }
}
