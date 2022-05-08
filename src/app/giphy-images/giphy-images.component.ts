import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { GiphyResult, ImageData } from '../giphy.interface';

@Component({
  selector: 'app-giphy-images',
  templateUrl: 'giphy-images.component.html',
  styleUrls:['./giphy-images.component.scss']
})

export class GiphyImagesComponent implements OnChanges {
  @Input() giphyResult: GiphyResult = { data: [], pagination: { count:0, offset:0, total_count:0} };
  @Output() pageChange: EventEmitter<number> = new EventEmitter();

  private _currentPage = 1;

  constructor() { }

  ngOnChanges(changes): void {
    // Reset pagination when new search is started
    if(changes.giphyResult.currentValue.pagination?.offset===0) {
      this.currentPage = 1;
    }
  }

  public onPageChange(page: number) {
    this.pageChange.emit(page);
  }

  public get currentPage() {
    return this._currentPage;
  }

  public set currentPage(page: number) {
    this._currentPage = page;
  }

  public trackByItems(index: number, item: ImageData) {
    return item.id;
  }

}
