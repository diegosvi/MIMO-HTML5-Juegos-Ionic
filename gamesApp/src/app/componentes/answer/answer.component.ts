import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'answer',
  templateUrl: './answer.component.html',
  styleUrls: ['./answer.component.scss'],
})
export class AnswerComponent implements OnInit {

  @Input() words;
  @Input() answer;

  constructor() { }

  ngOnInit() {}

}
