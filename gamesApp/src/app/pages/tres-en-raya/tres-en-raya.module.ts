import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { TresEnRayaPage } from './tres-en-raya.page';
import { BoardComponent } from 'src/app/componentes/board/board.component';
import { GameModeComponent } from 'src/app/componentes/game-mode/game-mode.component';
import { UsernameInputModule } from 'src/app/modulos/username-input/username-input.module';

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
    RouterModule.forChild(routes),
    UsernameInputModule
  ],
  declarations: [TresEnRayaPage, BoardComponent, GameModeComponent]
})
export class TresEnRayaPageModule { }
