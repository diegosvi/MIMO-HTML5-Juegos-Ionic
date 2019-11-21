import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'game-image',
  templateUrl: './game-image.component.html',
  styleUrls: ['./game-image.component.scss'],
})
export class GameImageComponent implements OnInit {

  @Input() imagePath;

  constructor() { }

  ngOnInit() { }

}
