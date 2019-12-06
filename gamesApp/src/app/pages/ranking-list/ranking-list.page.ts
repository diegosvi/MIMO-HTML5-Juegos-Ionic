import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/servicios/storage/storage.service';

@Component({
  selector: 'app-ranking-list',
  templateUrl: './ranking-list.page.html',
  styleUrls: ['./ranking-list.page.scss', '../../app.component.scss'],
})
export class RankingListPage implements OnInit {

  ranking;

  constructor(private storageService: StorageService) {
    this.storageService.getRanking().then(rankingJSON => {
      this.ranking = JSON.parse(rankingJSON);
    });
  }

  ngOnInit() { }

}
