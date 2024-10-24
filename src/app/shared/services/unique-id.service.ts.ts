import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UniqueIDService {
  private id: number = Date.now();
  public next(): string {
    return `aria-id-${++this.id}`;
  }
}
