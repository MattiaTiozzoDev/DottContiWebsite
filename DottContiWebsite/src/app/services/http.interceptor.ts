import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { LoadingService } from './loading.service';
import { ToastService } from './toast.service';

@Injectable()
export class HttpInterceptorService implements HttpInterceptor {
  constructor(
    private loadingService: LoadingService,
    private toastService: ToastService,
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    const skipLoading = req.headers.has('skip-loading');
    const skipErrorToast = req.headers.has('skip-error-toast');

    if (!skipLoading) {
      this.loadingService.show();
    }

    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        if (!skipErrorToast) {
          this.handleError(error);
        }

        return throwError(() => error);
      }),

      finalize(() => {
        if (!skipLoading) {
          this.loadingService.hide();
        }
      }),
    );
  }

  private handleError(error: HttpErrorResponse) {
    let message = 'Errore imprevisto';

    if (error.status === 0) {
      message = 'Errore di connessione';
    } else if (error.status >= 500) {
      message = 'Errore server';
    } else if (error.status === 401) {
      message = 'Non autorizzato';
    } else if (error.status === 404) {
      message = 'Risorsa non trovata';
    } else if (error.error?.message) {
      message = error.error.message;
    }

    this.toastService.error(message);
  }
}
