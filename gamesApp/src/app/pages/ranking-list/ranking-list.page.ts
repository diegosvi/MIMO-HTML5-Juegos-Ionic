import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/servicios/storage/storage.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-ranking-list',
  templateUrl: './ranking-list.page.html',
  styleUrls: ['./ranking-list.page.scss', '../../app.component.scss'],
})
export class RankingListPage implements OnInit {

  ranking;

  constructor(private storageService: StorageService, private alertController: AlertController) {
    this.storageService.getRanking().then(rankingJSON => {
      this.ranking = JSON.parse(rankingJSON);
    });
  }

  ngOnInit() { }

  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      header: '¿Seguro que quieres borrar los datos?',
      message: 'Se perderá todo el progreso hasta ahora.',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: null
        }, {
          text: 'Aceptar',
          handler: () => {
            this.cleanStorage();
          }
        }
      ]
    });

    await alert.present();
  }

  cleanStorage() {
    this.storageService.cleanData().then(_ => {
      this.storageService.getRanking().then(rankingJSON => {
        this.ranking = JSON.parse(rankingJSON);
      });
    });
  }

}
