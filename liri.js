require("dotenv").config();
var fs = require("fs");

var keys = require("./keys.js");
var Spotify = require(`node-spotify-api`);
var Twitter = require("twitter");
var spotify = new Spotify({
    id: keys.spotify.id,
    secret: keys.spotify.secret
})

var command = process.argv[2];
var term = process.argv.slice(3).join(" ");
let queryUrl = "";

if (!command) {
    command = "my-tweets";
}

if (command == "my-tweets") {

}
if (command == "spotify-this-song") {
    if (!term) {
        term = "The Sign";
    }
    spotify.search({ type: 'track', query: term, limit: 1 }, function (err, data) {
        if (err) {
            return console.log(`Error occured: ` + err);
        }
        var song = data.tracks.items[0];
        var artists = song.album.artists[0].name;
        var songName = term;
        var album = song.album.name;
        var previewLink = song.preview_url;
        if (!previewLink) {
            previewLink = "https://giphy.com/gifs/rickroll-rick-astley-never-gonna-give-you-up-Vuw9m5wXviFIQ"
        }

        logData =`
artists: ${artists}
song name: ${songName}
album name: ${album}
preview link: ${previewLink}
`;

        console.log(logData);


    })
}
if (command == "movie-this") {
    if (!term) {
        term = "Mr. Nobody";
    }
}
if (command == "do-what-it-says") {

} 
