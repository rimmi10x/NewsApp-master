import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  createAction,
  props,
  createReducer,
  on,
  createSelector,
} from '@ngrx/store';
import { map } from 'rxjs';
import { News } from '../../domain/News/News';
import { LoadAllNewsHandler } from './LoadAllNews/LoadAllNewsHandler';
import { LoadAllNewsQuery } from './LoadAllNews/LoadAllNewsQuery';

const setNewsActionName = (actionName: string): string => {
  return `[News] ${actionName}`;
};
export const newsLoaded = createAction(
  setNewsActionName('news loadded'),
  props<{ news: News[] }>()
);

export const newsIsLoading = createAction(
  setNewsActionName('news is loading'),
  props<{ isLoading: boolean }>()
);

export const noNewsOperation = createAction(
  setNewsActionName('no news operation')
);

export interface NewsState {
  news: News[];
  isloading: boolean | null;
}

export const newsState: NewsState = {
  news: [],
  isloading: null,
};

export const newsReducer = createReducer(
  newsState,
  on(newsIsLoading, (state: NewsState, { isLoading }) => ({
    ...state,
    isloading: isLoading,
  })),
  on(newsLoaded, (state, { news }) => ({ ...state, news: news }))
);

const selectNews = (state: any) => state.news;

export const selectNewsIsLoading = createSelector(
  selectNews,
  (state: NewsState) => state.isloading
);

export const selectAllNews = createSelector(
  selectNews,
  (state: NewsState) => state.news
);

@Injectable()
export class NewsEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly loadAllNewsHandler: LoadAllNewsHandler
  ) {}

  loadNews$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LoadAllNewsQuery.name),
      map((query) => {
        this.loadAllNewsHandler.execute(query);
        return noNewsOperation();
      })
    )
  );
}
