import { Component } from '@angular/core';
import {
  BehaviorSubject,
  debounceTime,
  distinctUntilChanged,
  filter,
  switchMap,
} from 'rxjs';
import { GiphyApiService } from '../giphy-api.service';
import { GiphyResult, SearchRequest } from '../giphy.interface';

@Component({
  selector: 'app-home',
  templateUrl: 'home.component.html',
})
export class HomeComponent {
  public searchText = '';

  public pageSize = 9;

  public imageSearch = new BehaviorSubject<SearchRequest>({
    q: '',
    limit: this.pageSize.toString(),
    offset: '0',
  });

  public giphyResult: GiphyResult = {
    data: [],
    pagination: { count: 0, offset: 0, total_count: 0 },
  };

  public images$ = this.imageSearch.pipe(
    debounceTime(500),
    distinctUntilChanged(),
    filter((request) => request.q.length > 2),
    switchMap((request) => this.giphyApiService.search(request)),
  );

  constructor(private giphyApiService: GiphyApiService) {}

  public doImageSearch(text: string) {
    this.searchText = text;
    this.imageSearch.next({
      q: text,
      limit: this.pageSize.toString(),
      offset: '0',
    });
  }

  public onPageChange(page: number) {
    const offset = (page - 1) * this.pageSize + 1;
    this.imageSearch.next({
      q: this.searchText,
      limit: this.pageSize.toString(),
      offset: offset.toString(),
    });
  }
}
