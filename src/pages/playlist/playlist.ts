import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { YtProvider } from "../../providers/yt/yt";
import { Observable } from "rxjs/Observable";
import { YoutubeVideoPlayer } from "@ionic-native/youtube-video-player";

/**
 * Generated class for the PlaylistPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-playlist',
  templateUrl: 'playlist.html',
})
export class PlaylistPage {
  videos: Observable<any[]>;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private ytProvider: YtProvider,
              private youtube: YoutubeVideoPlayer,
              private plt: Platform) {
    let listId = this.navParams.get('id');

    this.ytProvider.getListVideo(listId).subscribe(data => {
      this.videos = data['items'];
      console.log('this is Video Player');
      console.log(this.videos);
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PlaylistPage');
  }

  openVideo(video) {
    if (this.plt.is('cordova')) {
      this.youtube.openVideo(video.snippet.resourceId.videoId);
    } else {
      window.open('https://www.youtube.com/watch?v=' + video.snippet.resourceId.videoId);
    }
  }
}
