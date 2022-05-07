import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { GiphyApiService } from './giphy-api.service';
import { GiphyResult } from './giphy.interface';
import { ToastService } from './shared/toast/toast.service';

const emptyResponse = {
  data: [],
  pagination: {
    count: 0,
    offset: 0,
    total_count: 0,
  },
};

describe('GiphyApiService', () => {
  let httpClientSpy: jasmine.SpyObj<HttpClient>;

  let giphyApiService: GiphyApiService;
  let toastService: ToastService;

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    TestBed.configureTestingModule({ providers: [ToastService] });
    toastService = TestBed.inject(ToastService);
    giphyApiService = new GiphyApiService(httpClientSpy, toastService);
  });

  it('should initialize default params', () => {
    expect(GiphyApiService.emptyResponse).toEqual(emptyResponse);
  });

  it('should return giphy images', (done: DoneFn) => {
    const expectedImages: GiphyResult = {
      data: [
        {
          id: '1',
          images: {
            fixed_width: {
              url: 'https://media1.giphy.com/media/BzyTuYCmvSORqs1ABM/200w.gif?cid=d70edc71eb7jpmqubf7de4e0727en4f818fj52nvzg5hvji5&rid=200w.gif&ct=g',
            },
            fixed_height: {
              url: 'https://media1.giphy.com/media/BzyTuYCmvSORqs1ABM/200w.gif?cid=d70edc71eb7jpmqubf7de4e0727en4f818fj52nvzg5hvji5&rid=200w.gif&ct=g',
            },
          },
          type: 'gifs',
          title: 'Sci Fi Lol GIF by Hallmark Gold Crown',
        },
      ],
      pagination: {
        count: 1,
        offset: 0,
        total_count: 1,
      },
    };
    httpClientSpy.get.and.returnValue(of(expectedImages));
    giphyApiService.search({ offset: 0, limit: 9, q: 'dog' }).subscribe({
      next: (images) => {
        expect(images).withContext('expected images').toEqual(expectedImages);
        done();
      },
      error: done.fail,
    });
    expect(httpClientSpy.get.calls.count()).withContext('one call').toBe(1);
  });
});
