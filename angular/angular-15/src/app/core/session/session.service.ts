import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Session } from './session'
@Injectable({
  providedIn: 'root'
})
export class SessionService {
  private readonly subject_ = new BehaviorSubject<Session | undefined>(undefined)
  constructor() { 
    
  }
}
