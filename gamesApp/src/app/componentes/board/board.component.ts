import { Component, OnInit, Input, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent implements OnInit {

  @Input() matrix;
  @Output() select = new EventEmitter();

  constructor() { }

  ngOnInit() {}

  cellSelected(event) {
    const id = event.srcElement.id.split("");
    this.select.emit(id);
  }
}
