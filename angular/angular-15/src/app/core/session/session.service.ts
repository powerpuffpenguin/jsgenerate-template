import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Session } from './session'
@Injectable({
  providedIn: 'root'
})
export class SessionService {
  private readonly subject_ = new BehaviorSubject<Session | undefined>(undefined)
  constructor() {

  }
  /**
   * 在 session 發生變化時發送通知
   */
  get stream(): Observable<Session | undefined> {
    return this.subject_
  }

}
