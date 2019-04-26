import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  messages: string[] = [];

  add(message: string): void {
    this.messages.push(message);
  }

  clear(): void {
    this.messages.length = 0;
  }

  isEmpty(): boolean {
    return this.messages.length === 0;
  }
}
