import {Injectable, provide} from 'angular2/core';
import {Http} from 'angular2/http';
import {Subject, BehaviorSubject, Observable} from 'rxjs';
import {BinaryData} from '../models';
import 'rxjs/Rx';


@Injectable()
export class BinaryLoadService {


  constructor(public http: Http) {
  }

  query(URL:string): Observable<any[]> {

    return Observable.create(observer=>{
      let req = new XMLHttpRequest();
      console.log('BinaryLoadService URL ='+URL)
      req.open('get',URL);
      req.responseType = "arraybuffer";
      req.onreadystatechange = function() {
        if (req.readyState == 4 && req.status == 200) {
          observer.next(req.response);
          console.log("req.response",req.response)
          observer.complete();
        }
      };
      req.send();
    });


  }


  getTrack(URL: string): Observable<any[]> {
    return this.query(URL);
  }
}

export var BINARYLOAD_PROVIDERS: Array<any> = [
  provide(BinaryLoadService, {useClass:BinaryLoadService})
];