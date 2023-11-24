import { Store } from '@ngrx/store';
import { INewsRepository } from '../../../domain/News/news-repository.interface';
import { LoadAllNewsQuery } from './LoadAllNewsQuery';
import { News } from '../../../domain/News/News';
import { newsIsLoading, newsLoaded } from '../news-store';

export class LoadAllNewsHandler {
  private readonly newsRepository: INewsRepository;
  private readonly store: Store;

  public constructor(newsRepository: INewsRepository, store: Store) {
    this.newsRepository = newsRepository;
    this.store = store;
  }

  public async execute(query: LoadAllNewsQuery): Promise<void> {
    this.store.dispatch(newsIsLoading({ isLoading: true }));
    try {
      const news: News[] = await this.newsRepository.GetAll();
      this.store.dispatch(newsLoaded({ news }));
    } catch {
      this.store.dispatch(newsIsLoading({ isLoading: false }));
    } finally {
      this.store.dispatch(newsIsLoading({ isLoading: false }));
    }
  }
}
