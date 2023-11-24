import { EnvironmentProviders, Provider } from '@angular/core';
import { INewsRepository } from '../../domain/News/news-repository.interface';
import { NewsRepositoryInMemory } from '../../adapters/inMemory/news-repository.in-memory';
import { LoadAllNewsHandler } from '../../usecases/News/LoadAllNews/LoadAllNewsHandler';
import { Store } from '@ngrx/store';

export const servicesContainer: (Provider | EnvironmentProviders)[] = [
  {
    provide: INewsRepository,
    useFactory: () =>
      new NewsRepositoryInMemory([
        { id: crypto.randomUUID(), title: 'title1', content: 'content1' },
        { id: crypto.randomUUID(), title: 'title2', content: 'content2' },
      ]),
  },
  {
    provide: LoadAllNewsHandler,
    deps: [Store, INewsRepository],
    useFactory: (store: Store, repo: INewsRepository) =>
      new LoadAllNewsHandler(repo, store),
  },
];
