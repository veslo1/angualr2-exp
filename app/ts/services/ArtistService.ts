import {Injectable, bind} from 'angular2/core';
import {Subject, BehaviorSubject, Observable} from 'rxjs';
import {Artist, BinaryData} from '../models';
import {BinaryLoadService} from '../services/BinaryLoadService';



let initialArtistList: Artist[] = [];


interface IArtistsOperation extends Function {
    (artistList: Artist[]): Artist[];
}

@Injectable()
export class ArtistService {

    private audioContext: AudioContext;
    private audioBuffer: AudioBuffer;
    private playbackRate: number = 1.0;
    private gain: number = 1.0;

    query: string;
    results: Object;

    draftBinaryData= new BinaryData();
    // a stream that publishes new messages only once
    newArtists: Subject<Artist> = new Subject<Artist>();


    // `artist` is a observable that contains the most up to date list of threads
    artistList: Observable<Artist[]>;


    updates: Subject<any> = new Subject<any>();

    /**
     * UserService manages our current user
     */
    // action streams
    create: Subject<Artist> = new Subject<Artist>();



    constructor(public binaryLoadService:BinaryLoadService) {

        this.audioContext = new AudioContext();
        this.artistList = this.updates
            // watch the updates and accumulate operations on the messages
            .scan((artistList: Artist[],
                   operation: IArtistsOperation) => {

                    return operation(artistList);
                },
                initialArtistList)
            // make sure we can share the most recent list of messages across anyone
            // who's interested in subscribing and cache the last known list of
            // messages
            .publishReplay(1)
            .refCount();

        this.create
            .map( function(artist: Artist): IArtistsOperation {
                return (artistList: Artist[]) => {
                    return artistList.concat(artist);
                };
            })
            .subscribe(this.updates);

        this.newArtists
            .subscribe(this.create);
    }

    // an imperative function call to this action stream
    addArtist(artist: Artist): void {
        this.newArtists.next(artist);
    }

    setCurrentArtist(artistRequest): void{
        let bd: BinaryData = this.draftBinaryData;
        bd.artist = artistRequest;
        console.log('bd.artist.trackURL ='+bd.artist.trackURL);
        this.query = bd.artist.trackURL;
        this.binaryLoadService
            .getTrack(this.query)
            .subscribe(( res:any) => this.renderResults(res));
    }

    renderResults(res): void {
        var ref = this;
        this.audioContext.decodeAudioData( res, function(buffer){
        ref.audioBuffer = buffer;
        console.log("this.gain ="+ref.gain)
        console.log("this.audioBuffer.length ="+ref.audioBuffer.length);
        console.log("this.audioBuffer.duration ="+ref.audioBuffer.duration);
        })
    }

    playBuffer(): void {
        let bufferSource = this.audioContext.createBufferSource();
        console.log("this.audioBuffer.length ="+this.audioBuffer.length);
        console.log("this.audioBuffer.duration ="+this.audioBuffer.duration);
        bufferSource.buffer = this.audioBuffer;
        bufferSource.playbackRate.value = this.playbackRate;

        let gainNode = this.audioContext.createGain();
        gainNode.gain.value = this.gain;

        bufferSource.connect(gainNode);
        gainNode.connect(this.audioContext.destination);

        bufferSource.start(0);
    }
}

export var artistServiceInjectables: Array<any> = [
    bind(ArtistService).toClass(ArtistService)
];
