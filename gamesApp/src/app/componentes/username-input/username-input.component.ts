import { Component, OnInit, Input, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'username-input',
  templateUrl: './username-input.component.html',
  styleUrls: ['./username-input.component.scss'],
})
export class UsernameInputComponent implements OnInit {

  @Input() username;
  @Output() edit = new EventEmitter();

  constructor() { }

  ngOnInit() { }

  changeUsername() {
    this.edit.emit(this.username);
  }

}
