require("dotenv").config();
var fs = require("fs");

var keys = require("./keys.js");
var Spotify = require(`node-spotify-api`);
var Twitter = require("twitter");
var request = require("request");
var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

var command = process.argv[2];
var term = process.argv.slice(3).join(" ");
let queryUrl = "";

if (!command) {
    command = "my-tweets";
}

if (command == "my-tweets") {
    var params = { screen_name: 'KevMonahan' };
    client.get('statuses/user_timeline', params, function (error, tweets, response) {
        if (!error) {
            console.log("~~~~~~~~~~~~~Listing Tweets~~~~~~~~~~~~~~");
            for (i = 0; i < tweets.length; i++) {
                console.log(`
Tweet Created at: ${tweets[i].created_at}

Tweet Text Body: ${tweets[i].text}
`);
            }
        }
    })
}
if (command == "spotify-this-song") {
    if (!term) {
        term = "The Sign";
    }
    spotify.search({ type: 'track', query: term, limit: 1 }, function (err, data) {
        if (err) {
            return console.log(`Error occured: ` + err);
        }

        console.log("~~~~~~~~~~~~~~~Song Info~~~~~~~~~~~~~~")
        var song = data.tracks.items[0];
        var artists = song.album.artists[0].name;
        var songName = term;
        var album = song.album.name;
        var previewLink = song.preview_url;
        if (!previewLink) {
            previewLink = "https://giphy.com/gifs/rickroll-rick-astley-never-gonna-give-you-up-Vuw9m5wXviFIQ"
        }

        logData = `
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
    queryUrl = "http://www.omdbapi.com/?apikey=trilogy&t="+term;

    request(queryUrl, function (error, response, body) {
        if (error) {
        console.log('error:', error);
        console.log('statusCode:', response && response.statusCode);
        }
console.log("~~~~~~~~~~~~~~Movie Info~~~~~~~~~~~~~")
        var movieData = JSON.parse(body);
        console.log(`

Movie title: ${movieData.Title}
Release Year: ${movieData.Year}
IMDB Rating: ${movieData.Ratings[0].Value}
Rotten Tomatoes Rating: ${movieData.Ratings[1].Value}
Country Of Origin: ${movieData.Country}
Movie Language: ${movieData.Language}
Movie Plot: ${movieData.Plot}
Actors: ${movieData.Actors}

`)
    })
    
}
if (command == "do-what-it-says") {
// use fs.readFile to bring in the contents of random.txt
// do a comparison on the first argument brought in to see which function it should call
// output data based upon the comparison called.
// would probably be helpful to break the code out inside of each if statement above into functions outside that can be called multiple times.
// be sure to catch a possible infinite loop in the event of random.txt saying do-what-it-says
// 
} 
