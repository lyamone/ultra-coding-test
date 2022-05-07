import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { ToastComponent } from './toast.component';
import { ToastService } from './toast.service';

@NgModule({
  imports: [CommonModule, NgbModule],
  exports: [ToastComponent],
  declarations: [ToastComponent],
  providers: [ToastService],
})
export class ToastModule { }
