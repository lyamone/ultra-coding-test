import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: 'navbar.component.html'
})

export class NavbarComponent {
  @Output() searchImage = new EventEmitter<string>();

  public searchText = '';

  constructor() { }

  public doImageSearch(text: string) {
    this.searchImage.emit(text);
  }
}
