import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Session } from './session'

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  private readonly subject_ = new BehaviorSubject<Session | undefined>(undefined)
  constructor() {
    try {
      const session = Session.load()
      if (session !== undefined) {
        this.subject_.next(session)
      }
    } catch (e) {
      console.warn(`load session error`, e)
    }
  }
  /**
   * 返回當前 session
   */
  get session(): Session | undefined {
    return this.subject_.value
  }
  /**
   * 在 session 發生變化時發送通知
   */
  get stream(): Observable<Session | undefined> {
    return this.subject_
  }

}
