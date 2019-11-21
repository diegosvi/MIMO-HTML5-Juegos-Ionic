import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { AhorcadoPage } from './ahorcado.page';
import { AnswerComponent } from 'src/app/componentes/answer/answer.component';
import { CharactersBoxComponent } from 'src/app/componentes/characters-box/characters-box.component';
import { GameImageComponent } from 'src/app/componentes/game-image/game-image.component';

const routes: Routes = [
  {
    path: '',
    component: AhorcadoPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [AhorcadoPage, AnswerComponent, CharactersBoxComponent, GameImageComponent]
})
export class AhorcadoPageModule { }
