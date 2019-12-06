import { Component, OnInit, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'game-mode',
  templateUrl: './game-mode.component.html',
  styleUrls: ['./game-mode.component.scss', '../../app.component.scss'],
})
export class GameModeComponent implements OnInit {

  @Output() select = new EventEmitter();

  constructor() { }

  ngOnInit() {}

  modeSelected(event) {
    const id = event.srcElement.id;
    this.select.emit(id);
  }

}
