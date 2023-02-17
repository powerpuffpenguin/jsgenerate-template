import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { Observable, takeUntil } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class TitleService {
  defaultTitle?: string
  constructor(private readonly title: Title,
    private readonly translateService: TranslateService,
  ) {
  }
  set(val: string) {
    if (this.defaultTitle === undefined) {
      this.defaultTitle = this.title.getTitle()
    }
    this.title.setTitle(val)
  }
  reset() {
    if (this.defaultTitle !== undefined) {
      this.title.setTitle(this.defaultTitle)
    }
  }
  /**
   * 監聽 key 的值將其設置到標題
   * @param key 
   */
  watchTitle(key: string, notifier?: Observable<any>) {
    this.translateService.stream(key).pipe(
      takeUntil(notifier as any),
    ).subscribe({
      next: (val) => {
        this.set(val)
      },
      complete: () => {
        this.reset()
      },
    })
  }
}
