/* tslint:disable:max-line-length */


import {Artist, BinaryData} from './models';
import {ArtistService} from './services/services';





let initialArtistList: Array<Artist> = [

    new Artist('The Sugarhill Gang',
                'The Message',
                'https://upload.wikimedia.org/wikipedia/en/thumb/f/fa/Rappersdelight.jpeg/220px-Rappersdelight.jpeg',
                'https://upload.wikimedia.org/wikipedia/en/d/db/Rapper%27s_Delight_sample.ogg'
            ),

    new Artist('Boogie Down Productions',
                'The South Bronx',
                'https://upload.wikimedia.org/wikipedia/en/thumb/e/e5/Boogie_Down_Productions.jpg/220px-Boogie_Down_Productions.jpg',
                'https://upload.wikimedia.org/wikipedia/en/6/65/South_Bronx.ogg'
            ),

    new Artist('Public Enemy',
                'Your\'re Gonna Get Yours',
                'https://upload.wikimedia.org/wikipedia/en/thumb/f/f9/You%27re_Gonna_Get_Yours_single.jpg/220px-You%27re_Gonna_Get_Yours_single.jpg',
                'https://upload.wikimedia.org/wikipedia/en/d/da/You%27re_Gonna_Get_Yours.ogg')
    ];



export class BinaryLoadExampleData {
    static init(artistService: ArtistService): void {

        // TODO make `messages` hot
        artistService.artistList.subscribe(() => ({}));

        // set "Juliet" as the current user
       // userService.setCurrentUser(me);

        // create the initial messages
        console.log("Passing Artist")
        initialArtistList.map( (artist: Artist) => artistService.addArtist(artist));
    }

}