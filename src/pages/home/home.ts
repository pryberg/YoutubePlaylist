import { Component } from '@angular/core';
import { AlertController, NavController } from 'ionic-angular';
import { YtProvider } from "../../providers/yt/yt";
import { Observable } from "rxjs/Observable";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  //channelId = 'UC4eQUnuPtY92dYeDaU6-rVA';
  channelId = 'UCABY82RmbxjtEJIaFGyK1dg';
  playlists: Observable<any[]>;

  constructor(public navCtrl: NavController,
              private ytProvider: YtProvider,
              private alertCtrl: AlertController) {}

  searchPlaylists() {
    this.ytProvider.getPlaylistsForChannel(this.channelId).subscribe(data=> {
      this.playlists = data['items'];
      console.log('This is Playlist for ChannelID');
      console.log(this.playlists);
      console.log('Starting...')
    }, err => {
        let alert = this.alertCtrl.create({
          title: 'Error',
          message: 'No Playlists found for that Channel ID',
          buttons: ['OK']
        });
        alert.present();
    });
  }

  openPlaylist(id) {
    this.navCtrl.push('PlaylistPage', {id: id});
  }
}
