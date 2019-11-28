import { Component, OnInit, Input, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent implements OnInit {

  @Input() dimension;
  @Input() matrix;
  @Input() gameFinished;
  @Input() victoryCells;
  @Output() select = new EventEmitter();
  X_symbol = "../../../assets/images/tic-tac-toe/X_symbol.png";
  O_symbol = "../../../assets/images/tic-tac-toe/O_symbol.png";

  constructor() { }

  ngOnInit() { }

  cellSelected(event) {
    const id = event.srcElement.id.split("");
    this.select.emit(id);
  }
}
