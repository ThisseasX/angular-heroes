import { Component } from '@angular/core';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.sass']
})
export class MessagesComponent {
  constructor(private messageService: MessageService) { }

  get messages(): string[] {
    return this.messageService.messages;
  }

  clear(): void {
    this.messageService.clear();
  }

  isEmpty(): boolean {
    return this.messageService.isEmpty();
  }
}
