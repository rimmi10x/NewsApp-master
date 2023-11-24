import { delay } from 'rxjs';
import { News } from '../../domain/News/News';
import { INewsRepository } from '../../domain/News/news-repository.interface';

export class NewsRepositoryInMemory implements INewsRepository {
  public news: News[];

  constructor(news: News[]) {
    this.news = news;
  }

  public async GetAll(): Promise<News[]> {
    return new Promise((resolve) => {
        setTimeout(() => resolve(this.news), 1000);
      });
  }
}
