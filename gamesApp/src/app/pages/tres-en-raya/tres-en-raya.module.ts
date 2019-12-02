import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { TresEnRayaPage } from './tres-en-raya.page';
import { BoardComponent } from 'src/app/componentes/board/board.component';
import { GameModeComponent } from 'src/app/componentes/game-mode/game-mode.component';
import { UsernameInputComponent } from 'src/app/componentes/username-input/username-input.component';

const routes: Routes = [
  {
    path: '',
    component: TresEnRayaPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [TresEnRayaPage, BoardComponent, GameModeComponent, UsernameInputComponent]
})
export class TresEnRayaPageModule { }
