import { Injectable, TemplateRef } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class ToastService {
  private toastSubject  = new Subject<string[]>();
  public readonly toasts$ = this.toastSubject.asObservable();
  public toasts: string[] = [];

  show(text: string, options: any = {}) {
    this.toasts.push(text);
    this.toastSubject.next(this.toasts);
  }

  remove(toast: string) {
    this.toasts = this.toasts.filter(t => t !== toast);
    this.toastSubject.next(this.toasts);
  }

  clear() {
    this.toasts.splice(0, this.toasts.length);
    this.toastSubject.next([]);
  }
}
