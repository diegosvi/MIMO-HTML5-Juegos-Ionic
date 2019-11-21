import { Component, OnInit, Input, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Component({
    selector: 'characters-box',
    templateUrl: './characters-box.component.html',
    styleUrls: ['./characters-box.component.scss'],
})
export class CharactersBoxComponent implements OnInit {


    @Input() letters;
    @Input() numbers;
    @Output() select = new EventEmitter();

    constructor() { }

    ngOnInit() { }

    selectCharacter(event) {
        const character = event.srcElement.innerHTML;
        this.letters.map((letter => {
            if (letter.value === character) {
                letter.disabled = true;
            }
        }));
        this.numbers.map((number => {
            if (number.value === character || (number.value === "&" && character === "&amp;")) {
                number.disabled = true;
            }
        }));
        this.select.emit(character);
    }

}
