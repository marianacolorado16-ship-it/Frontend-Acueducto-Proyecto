import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {
  private _activeSectionId = new BehaviorSubject<string | null>(null);
  activeSectionId$: Observable<string | null> = this._activeSectionId.asObservable();

  setActiveSection(sectionId: string | null) {
    this._activeSectionId.next(sectionId);
  }
}