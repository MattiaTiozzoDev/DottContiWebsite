import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface ToastMessage {
  type: 'success' | 'error' | 'info' | 'warning';
  message: string;
  duration?: number;
}

@Injectable({ providedIn: 'root' })
export class ToastService {
  private toastsSubject = new BehaviorSubject<ToastMessage[]>([]);
  toast$ = this.toastsSubject.asObservable();

  show(toast: ToastMessage) {
    const current = this.toastsSubject.value;
    this.toastsSubject.next([...current, toast]);

    const duration = toast.duration ?? 3000;

    setTimeout(() => {
      this.removeByValue(toast);
    }, duration);
  }

  success(message: string) {
    this.show({ type: 'success', message });
  }

  error(message: string) {
    this.show({ type: 'error', message });
  }

  info(message: string) {
    this.show({ type: 'info', message });
  }

  warning(message: string) {
    this.show({ type: 'warning', message });
  }

  remove(index: number) {
    const current = this.toastsSubject.value;
    current.splice(index, 1);
    this.toastsSubject.next([...current]);
  }

  private removeByValue(toast: ToastMessage) {
    const current = this.toastsSubject.value;
    const filtered = current.filter((t) => t !== toast);
    this.toastsSubject.next(filtered);
  }
}
