import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { GiphyResult, ImagesType } from './giphy.interface';
import { ToastService } from './shared/toast/toast.service';

@Injectable({
  providedIn: 'root',
})
export class GiphyApiService {
  private static readonly baseGiphyUrl = 'https://api.giphy.com/v1';

  public static readonly emptyResponse = {
    data: [],
    pagination: {
      count: 0,
      offset: 0,
      total_count: 0,
    },
  };

  private static readonly defaultParams = {
    api_key: environment.giphyApiKey,
    lang: 'en',
  };

  constructor(private http: HttpClient, private toastService: ToastService) {}

  public search(
    params: any,
    type: ImagesType = 'gifs'
  ): Observable<GiphyResult> {
    return this.request(`${type}/search`, params).pipe(
      catchError(() => {
        this.toastService.show('Error fetching images', 'danger');
        return of(GiphyApiService.emptyResponse);
      })
    );
  }

  public trending(
    params: any,
    type: ImagesType = 'gifs'
  ): Observable<GiphyResult> {
    return this.request(`${type}/trending`, params).pipe(
      catchError(() => {
        this.toastService.show('Error fetching trending images', 'danger');
        return of(GiphyApiService.emptyResponse);
      })
    );
  }

  private request(path: string, params: any): Observable<GiphyResult> {
    const fullParams = { ...GiphyApiService.defaultParams, ...params };
    return this.http.get<GiphyResult>(
      `${GiphyApiService.baseGiphyUrl}/${path}`,
      { params: fullParams }
    );
  }
}
