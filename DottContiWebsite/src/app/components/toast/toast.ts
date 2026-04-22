import { Component } from '@angular/core';
import { ToastMessage, ToastService } from '../../services/toast.service';
import { Observable } from 'rxjs';
import { AsyncPipe, NgClass } from '@angular/common';

@Component({
  selector: 'app-toast',
  imports: [AsyncPipe, NgClass],
  templateUrl: './toast.html',
  styleUrl: './toast.scss',
})
export class Toast {
  toasts$: Observable<ToastMessage[]>;

  constructor(private toastService: ToastService) {
    this.toasts$ = this.toastService.toast$;
  }

  trackByIndex(index: number): number {
    return index;
  }

  close(index: number) {
    this.toastService.remove(index);
  }
}
