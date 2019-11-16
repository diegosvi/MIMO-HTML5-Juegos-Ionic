import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { TresEnRayaPage } from './tres-en-raya.page';

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
  declarations: [TresEnRayaPage]
})
export class TresEnRayaPageModule {}
