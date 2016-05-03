import {
  Component,
  OnInit,
  ChangeDetectionStrategy
} from 'angular2/core';
import {ArtistService} from '../services/services';
import {Observable} from 'rxjs';
import {Artist} from '../models';

@Component({
  inputs: ['artist'],
  selector: 'artist-view',
  template: `
  <div class="media conversation">
    <div class="pull-left">
      <img class="media-object avatar" 
           src="{{artist.albumImgSrc}}">
    </div>
    <div class="media-body">
      <h5 class="media-heading contact-name">{{artist.artistName}}
        <span *ngIf="selected">&bull;</span>
      </h5>
      <small class="message-preview">{{artist.trackTitle}}</small>
    </div>
    <a (click)="clicked($event)" class="div-link">Select</a>
  </div>
  `
})

class ArtistView{
  artist: Artist;
  selected: boolean = false;

  constructor(public artistsService: ArtistService) {
  }
  clicked(event: any): void {
    console.log('clicked =',event);
    this.artistsService.setCurrentArtist(this.artist);
    event.preventDefault();
  }
}

@Component({
  selector: 'artist-list',
  directives: [ArtistList, ArtistView],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <!-- conversations -->
    <div class="row" >
      <div class="conversation-wrap">

        <artist-view 
             *ngFor="#artist of artists | async"
             [artist]="artist">
        </artist-view>

      </div>
     </div>
     <br>
     <br>
     <div class="row"><button (click)='playSample($event)'>play</button></div>
  `
})
export class ArtistList {
  artists: Observable<any>;

  constructor(public artistsService: ArtistService) {
    this.artists =  this.artistsService.artistList;
  }


  playSample(event:any):void{
    console.log('playSample =',event);
    this.artistsService.playBuffer();
    event.preventDefault();
  }

}
