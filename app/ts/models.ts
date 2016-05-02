import { uuid } from './util/uuid';



export class Artist {
    id: string;

    constructor(public artistName:string,
                public trackTitle: string,
                public albumImgSrc: string,
                public trackURL:string){
                       this.id = uuid();
                }


}




export class BinaryData {
    id:string;
    artist:Artist;
    binaryBuffer:ArrayBuffer;
    constructor(obj?: any){
        this.id              = obj && obj.id              || uuid();
        this.artist          = obj && obj.artist          || null;
        this.binaryBuffer    = obj && obj.binaryBuffer    || null;
    }
}