import { LocationStrategy } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AssetsService {
  constructor(
    private readonly httpClient: HttpClient,
    private readonly locationStrategy: LocationStrategy,
  ) { }

  text(path: string) {
    let url = this.locationStrategy.getBaseHref()
    if (!url.endsWith('/')) {
      url += '/'
    }
    if (path.startsWith('/')) {
      path = path.substring(1)
    }
    return this.httpClient.get(`${url}${path}`, {
      responseType: 'text',
    })
  }
}
