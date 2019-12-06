import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./home/home.module').then(m => m.HomePageModule) },
  { path: 'ahorcado', loadChildren: './pages/ahorcado/ahorcado.module#AhorcadoPageModule' },
  { path: 'tresEnRaya', loadChildren: './pages/tres-en-raya/tres-en-raya.module#TresEnRayaPageModule' },
  { path: 'ranking', loadChildren: './pages/ranking-list/ranking-list.module#RankingListPageModule' },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
